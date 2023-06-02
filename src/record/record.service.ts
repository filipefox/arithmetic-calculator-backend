import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
  ) {}

  async save(record: Record) {
    return await this.recordRepository.save(record);
  }

  findAll(): Promise<Record[]> {
    return this.recordRepository.find();
  }

  async deleteById(id: number): Promise<void> {
    const record = await this.recordRepository.findOneBy({ id: id });
    record.deleted = true;
    await this.recordRepository.save(record);
  }
}
