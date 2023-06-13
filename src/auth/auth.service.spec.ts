import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

class MockRequest {
  user: { sub: number };

  constructor(userId: number) {
    this.user = { sub: userId };
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    service = new AuthService(userService, jwtService, new MockRequest(1));
  });

  describe('login', () => {
    it('should return an access token if login is successful', async () => {
      const username = 'foo@bar.com';
      const password = 'foobar';
      const hashedPassword =
        '$2b$04$frBHr.MdAn144qFHYCKAhevpqF6yvUE2N1SVclOye7MD7/geWClHW';
      const user = new User(1);
      user.username = username;
      user.password = hashedPassword;
      const expectedAccessToken = 'mocked_token';

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(user);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue(expectedAccessToken);

      const result = await service.login(username, password);

      expect(userService.findByUsername).toHaveBeenCalledWith(username);
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: user.id });
      expect(result.access_token).toEqual(expectedAccessToken);
    });

    it('should throw UnauthorizedException if login fails', async () => {
      const username = 'john';
      const password = 'wrong_password';

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(null);

      await expect(service.login(username, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userService.findByUsername).toHaveBeenCalledWith(username);
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user based on the request', () => {
      const request = { user: { sub: 1 } };
      const expectedUser = { id: 1 };

      service['request'] = request;

      const result = service.getCurrentUser();

      expect(result).toEqual(expectedUser);
    });
  });
});
