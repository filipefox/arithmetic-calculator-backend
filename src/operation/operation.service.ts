import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation, OperationType } from './operation.entity';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
  ) {}

  async save(): Promise<Operation> {
    const operation = new Operation(OperationType.addition, 0);
    return await this.operationRepository.save(operation);
  }

  findAll(): Promise<Operation[]> {
    return this.operationRepository.find();
  }

  findOne(id: number): Promise<Operation | null> {
    return this.operationRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.operationRepository.delete(id);
  }
}
