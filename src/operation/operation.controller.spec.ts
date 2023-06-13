import { Test, TestingModule } from '@nestjs/testing';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { OperationRequest } from './operation.request.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCredit } from '../user.credit/user.credit.entity';
import { DataSource, Repository } from 'typeorm';
import { Operation } from './operation.entity';
import { RecordService } from '../record/record.service';
import { UserCreditService } from '../user.credit/user.credit.service';
import { RandomOrgService } from '../random/random-org.service';
import { AuthService } from '../auth/auth.service';
import { Record } from '../record/record.entity';
import { HttpModule } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

describe('OperationController', () => {
  let controller: OperationController;
  let operationService: OperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [OperationController],
      providers: [
        OperationService,
        RecordService,
        UserCreditService,
        RandomOrgService,
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(Operation),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Record),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserCredit),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn(() => ({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              manager: {
                save: jest.fn(),
              },
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
            })),
          },
        },
      ],
    }).compile();

    operationService = module.get<OperationService>(OperationService);
    controller = new OperationController(operationService);
  });

  describe('operation', () => {
    it('should perform the operation and return the result', async () => {
      const operationRequest = new OperationRequest(1, 1, 0);
      const expectedResponse = { result: '2' };

      jest.spyOn(operationService, 'operation').mockResolvedValue(2);

      const result = await controller.operation(operationRequest);

      expect(operationService.operation).toHaveBeenCalledWith(operationRequest);
      expect(result).toEqual(expectedResponse);
    });
  });
});
