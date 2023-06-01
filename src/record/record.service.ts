import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record, RecordType } from './record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
  ) {}

  async save(): Promise<Record> {
    const record = new Record(RecordType.addition, 0);
    return await this.recordRepository.save(record);
  }

  findAll(): Promise<Record[]> {
    return this.recordRepository.find();
  }

  findOne(id: number): Promise<Record | null> {
    return this.recordRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.recordRepository.delete(id);
  }
}
