import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCreditService } from './user.credit.service';
import { UserCredit } from './user.credit.entity';
import { AuthService } from '../auth/auth.service';
import { EntityManager, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('UserCreditService', () => {
  let userCreditService: UserCreditService;
  let userCreditRepository: Repository<UserCredit>;
  let authService: AuthService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    entityManager = {} as EntityManager;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCreditService,
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(UserCredit),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userCreditRepository = module.get<Repository<UserCredit>>(
      getRepositoryToken(UserCredit),
    );
    authService = module.get<AuthService>(AuthService);
    userCreditService = new UserCreditService(
      userCreditRepository,
      authService,
    );
  });

  describe('getCredits', () => {
    it('should return the user credit value', async () => {
      const user = new User(1);
      const userCredit = new UserCredit();
      userCredit.value = 100;

      jest.spyOn(authService, 'getCurrentUser').mockReturnValue(user);
      jest
        .spyOn(userCreditRepository, 'findOneBy')
        .mockResolvedValue(userCredit);

      const result = await userCreditService.getCredits();

      expect(authService.getCurrentUser).toHaveBeenCalledTimes(1);
      expect(userCreditRepository.findOneBy).toHaveBeenCalledWith({ user });
      expect(result).toEqual(userCredit.value);
    });
  });

  describe('decreaseCredits', () => {
    it('should decrease user credits if there are enough credits', async () => {
      const user = new User(1);
      const userCredit = new UserCredit();
      userCredit.value = 100;

      jest.spyOn(authService, 'getCurrentUser').mockReturnValue(user);
      jest
        .spyOn(userCreditRepository, 'findOneBy')
        .mockResolvedValue(userCredit);
      jest.spyOn(userCreditRepository, 'save').mockResolvedValue(userCredit);
      entityManager.save = jest.fn().mockResolvedValue(userCredit);

      const result = await userCreditService.decreaseCredits(entityManager, 50);

      expect(authService.getCurrentUser).toHaveBeenCalledTimes(1);
      expect(userCreditRepository.findOneBy).toHaveBeenCalledWith({ user });
      expect(userCredit.value).toBe(50);
      expect(result).toEqual(userCredit);
    });

    it('should throw BadRequestException if there are not enough credits', async () => {
      const user = new User(1);
      const userCredit = new UserCredit();
      userCredit.value = 50;

      jest.spyOn(authService, 'getCurrentUser').mockReturnValue(user);
      jest
        .spyOn(userCreditRepository, 'findOneBy')
        .mockResolvedValue(userCredit);

      await expect(
        userCreditService.decreaseCredits(entityManager, 100),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
