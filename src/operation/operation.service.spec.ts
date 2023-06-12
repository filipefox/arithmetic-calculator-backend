import { Test, TestingModule } from '@nestjs/testing';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCredit } from '../user.credit/user.credit.entity';
import { Repository } from 'typeorm';
import { Operation, OperationType } from './operation.entity';
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
  let service: OperationService;
  let recordService: RecordService;
  let userCreditService: UserCreditService;
  let randomOrgService: RandomOrgService;
  let operationRepository: Repository<Operation>;

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
      ],
    }).compile();

    operationRepository = module.get<Repository<Operation>>(
      getRepositoryToken(Operation),
    );
    recordService = module.get<RecordService>(RecordService);
    userCreditService = module.get<UserCreditService>(UserCreditService);
    randomOrgService = module.get<RandomOrgService>(RandomOrgService);
    service = new OperationService(
      operationRepository,
      recordService,
      userCreditService,
      randomOrgService,
    );
  });

  describe('operation', () => {
    it('should perform addition and return the result', async () => {
      const operationRequest = {
        operationId: OperationType.addition,
        number1: 2,
        number2: 3,
      };
      const expectedResponse = 5;

      const operation = new Operation();
      operation.type = 0;
      operation.cost = 1;

      jest.spyOn(operationRepository, 'findOneBy').mockResolvedValue(operation);
      jest.spyOn(userCreditService, 'decreaseCredits').mockImplementation();
      jest.spyOn(recordService, 'save').mockImplementation();

      const result = await service.operation(operationRequest);

      expect(userCreditService.decreaseCredits).toHaveBeenCalledWith(1);
      expect(recordService.save).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should perform subtraction and return the result', async () => {
      const operationRequest = {
        operationId: OperationType.subtraction,
        number1: 5,
        number2: 3,
      };

      const operation = new Operation();
      operation.type = 1;
      operation.cost = 2;

      const expectedResponse = 2;

      jest.spyOn(operationRepository, 'findOneBy').mockResolvedValue(operation);
      jest.spyOn(userCreditService, 'decreaseCredits').mockImplementation();
      jest.spyOn(recordService, 'save').mockImplementation();

      const result = await service.operation(operationRequest);

      expect(userCreditService.decreaseCredits).toHaveBeenCalledWith(2);
      expect(recordService.save).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should perform multiplication and return the result', async () => {
      const operationRequest = {
        operationId: OperationType.multiplication,
        number1: 4,
        number2: 3,
      };
      const expectedResponse = 12;

      const operation = new Operation();
      operation.type = 2;
      operation.cost = 3;

      jest.spyOn(operationRepository, 'findOneBy').mockResolvedValue(operation);
      jest.spyOn(userCreditService, 'decreaseCredits').mockImplementation();
      jest.spyOn(recordService, 'save').mockImplementation();

      const result = await service.operation(operationRequest);

      expect(userCreditService.decreaseCredits).toHaveBeenCalledWith(3);
      expect(recordService.save).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should perform division and return the result', async () => {
      const operationRequest = {
        operationId: OperationType.division,
        number1: 10,
        number2: 2,
      };
      const expectedResponse = 5;

      const operation = new Operation();
      operation.type = 3;
      operation.cost = 4;

      jest.spyOn(operationRepository, 'findOneBy').mockResolvedValue(operation);
      jest.spyOn(userCreditService, 'decreaseCredits').mockImplementation();
      jest.spyOn(recordService, 'save').mockImplementation();

      const result = await service.operation(operationRequest);

      expect(userCreditService.decreaseCredits).toHaveBeenCalledWith(4);
      expect(recordService.save).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should perform division by zero and return the result', async () => {
      const operationRequest = {
        operationId: OperationType.division,
        number1: 10,
        number2: 0,
      };
      const expectedResponse = 'Cannot divide by zero';

      const operation = new Operation();
      operation.type = 3;
      operation.cost = 4;

      jest.spyOn(operationRepository, 'findOneBy').mockResolvedValue(operation);
      jest.spyOn(userCreditService, 'decreaseCredits').mockImplementation();
      jest.spyOn(recordService, 'save').mockImplementation();

      const result = await service.operation(operationRequest);

      expect(userCreditService.decreaseCredits).toHaveBeenCalledWith(4);
      expect(recordService.save).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should perform square root and return the result', async () => {
      const operationRequest = {
        operationId: OperationType.square_root,
        number1: 16,
      };
      const expectedResponse = 4;

      const operation = new Operation();
      operation.type = 4;
      operation.cost = 5;

      jest.spyOn(operationRepository, 'findOneBy').mockResolvedValue(operation);
      jest.spyOn(userCreditService, 'decreaseCredits').mockImplementation();
      jest.spyOn(recordService, 'save').mockImplementation();

      const result = await service.operation(operationRequest);

      expect(userCreditService.decreaseCredits).toHaveBeenCalledWith(5);
      expect(recordService.save).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should perform square root with negative number and return the result', async () => {
      const operationRequest = {
        operationId: OperationType.square_root,
        number1: -1,
      };
      const expectedResponse =
        'Cannot extract square root of a negative number from the set of real numbers';

      const operation = new Operation();
      operation.type = 4;
      operation.cost = 5;

      jest.spyOn(operationRepository, 'findOneBy').mockResolvedValue(operation);
      jest.spyOn(userCreditService, 'decreaseCredits').mockImplementation();
      jest.spyOn(recordService, 'save').mockImplementation();

      const result = await service.operation(operationRequest);

      expect(userCreditService.decreaseCredits).toHaveBeenCalledWith(5);
      expect(recordService.save).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should perform random string operation and return the result', async () => {
      const operationRequest = {
        operationId: OperationType.random_string,
      };
      const expectedResponse = 'random-string';

      const operation = new Operation();
      operation.type = 5;
      operation.cost = 6;

      jest.spyOn(operationRepository, 'findOneBy').mockResolvedValue(operation);
      jest.spyOn(userCreditService, 'decreaseCredits').mockImplementation();
      jest.spyOn(recordService, 'save').mockImplementation();
      jest
        .spyOn(randomOrgService, 'getRandomString')
        .mockResolvedValue(expectedResponse);

      const result = await service.operation(operationRequest);

      expect(userCreditService.decreaseCredits).toHaveBeenCalledWith(6);
      expect(recordService.save).toHaveBeenCalled();
      expect(randomOrgService.getRandomString).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });
  });
});
