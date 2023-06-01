import { Body, Controller, Post } from '@nestjs/common';
import { Operation, OperationType } from './operation.entity';
import { OperationRequest } from './operation.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from '../app.service';
import { OperationService } from './operation.service';

@Controller('operations')
export class OperationController {
  constructor(private operationService: OperationService) {}

  @Post()
  create(@Body() operationRequest: OperationRequest) {
    this.operationService.save();
  }
}
