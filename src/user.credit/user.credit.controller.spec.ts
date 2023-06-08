import { Test, TestingModule } from '@nestjs/testing';
import { UserCreditController } from './user.credit.controller';
import { UserCreditService } from './user.credit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCredit } from './user.credit.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

describe('UserCreditController', () => {
  let userCreditController: UserCreditController;
  let userCreditService: UserCreditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreditController],
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

    userCreditService = module.get(UserCreditService);
    userCreditController = new UserCreditController(userCreditService);
  });

  describe('getCredits', () => {
    it('should return the credits from the UserCreditService', async () => {
      const credits = 100;
      jest.spyOn(userCreditService, 'getCredits').mockResolvedValue(credits);

      const result = await userCreditController.getCredits();

      expect(userCreditService.getCredits).toHaveBeenCalledTimes(1);
      expect(result).toEqual(credits);
    });
  });
});
