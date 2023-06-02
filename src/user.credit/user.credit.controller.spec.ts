import { Test, TestingModule } from '@nestjs/testing';
import { UserCreditController } from './user.credit.controller';

describe('UserCreditController', () => {
  let controller: UserCreditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreditController],
    }).compile();

    controller = module.get<UserCreditController>(UserCreditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
