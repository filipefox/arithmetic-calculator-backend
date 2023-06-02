import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation, OperationType } from './operation.entity';
import {
  OperationRequest,
  SquareRootOperationRequest,
} from './operation.request.dto';
import { Record } from '../record/record.entity';
import { RecordService } from '../record/record.service';
import { UserCreditService } from '../user.credit/user.credit.service';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
    private recordService: RecordService,
    private userCreditService: UserCreditService,
  ) {}

  async operation(operationRequest: OperationRequest): Promise<number> {
    const operation = await this.operationRepository.findOneBy({
      type: operationRequest.operationId,
    });

    let request, response;

    switch (operationRequest.operationId) {
      case OperationType.addition: {
        request = `${operationRequest.number1} + ${operationRequest.number2}`;
        response = operationRequest.number1 + operationRequest.number2;
        break;
      }
      case OperationType.subtraction: {
        request = `${operationRequest.number1} - ${operationRequest.number2}`;
        response = operationRequest.number1 - operationRequest.number2;
        break;
      }
      case OperationType.multiplication: {
        request = `${operationRequest.number1} x ${operationRequest.number2}`;
        response = operationRequest.number1 * operationRequest.number2;
        break;
      }
      case OperationType.division: {
        request = `${operationRequest.number1} ÷ ${operationRequest.number2}`;
        response = operationRequest.number1 / operationRequest.number2;
        break;
      }
    }

    const record = new Record(operation, operation.cost, request, response);

    await this.recordService.save(record);
    await this.userCreditService.decreaseCredits(operation.cost);

    return response;
  }

  async squareRoot(
    squareRootOperationRequest: SquareRootOperationRequest,
  ): Promise<number> {
    const operation = await this.operationRepository.findOneBy({
      type: OperationType.square_root,
    });

    let response;

    if (squareRootOperationRequest.number < 0) {
      response = 'We cannot find the square root of a negative number';
    } else {
      response = Math.sqrt(squareRootOperationRequest.number);
    }

    const record = new Record(
      operation,
      operation.cost,
      `Square root of ${squareRootOperationRequest.number}`,
      response,
    );

    await this.recordService.save(record);
    await this.userCreditService.decreaseCredits(operation.cost);

    return response;
  }

  async randomString(): Promise<string> {
    const operation = await this.operationRepository.findOneBy({
      type: OperationType.square_root,
    });

    const response = 'We will get a random string from a external service';

    const record = new Record(
      operation,
      operation.cost,
      `Random string`,
      response,
    );

    await this.recordService.save(record);
    await this.userCreditService.decreaseCredits(operation.cost);

    return response;
  }
}
