import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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

    authService = module.get<AuthService>(AuthService);
    controller = new AuthController(authService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with the provided username and password', () => {
      const username = 'test_user';
      const password = 'test_password';
      const loginDto = { username, password };
      const expectedResult = Promise.resolve({ access_token: 'foo' });

      jest.spyOn(authService, 'login').mockReturnValue(expectedResult);

      const result = controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(username, password);
      expect(result).toBe(expectedResult);
    });
  });
});
