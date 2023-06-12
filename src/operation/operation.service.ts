import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation, OperationType } from './operation.entity';
import { OperationRequest } from './operation.request.dto';
import { Record } from '../record/record.entity';
import { RecordService } from '../record/record.service';
import { UserCreditService } from '../user.credit/user.credit.service';
import { RandomOrgService } from '../random/random-org.service';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
    private recordService: RecordService,
    private userCreditService: UserCreditService,
    private randomOrgService: RandomOrgService,
  ) {}

  async operation(operationRequest: OperationRequest): Promise<number> {
    const operation = await this.operationRepository.findOneBy({
      type: operationRequest.operationId,
    });

    await this.userCreditService.decreaseCredits(operation.cost);

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

        if (operationRequest.number2 > 0) {
          response = operationRequest.number1 / operationRequest.number2;
        } else {
          response = 'Cannot divide by zero';
        }

        break;
      }
      case OperationType.square_root: {
        request = `Square root of ${operationRequest.number1}`;

        if (operationRequest.number1 >= 0) {
          response = Math.sqrt(operationRequest.number1);
        } else {
          response =
            'Cannot extract square root of a negative number from the set of real numbers';
        }

        break;
      }
      case OperationType.random_string: {
        request = `Random string`;
        response = await this.randomOrgService.getRandomString();
        break;
      }
    }

    const record = new Record(operation, operation.cost, request, response);
    await this.recordService.save(record);

    return response;
  }
}
