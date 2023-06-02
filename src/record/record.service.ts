import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RecordService {
  constructor(
    private authService: AuthService,
    @InjectRepository(Record) private recordRepository: Repository<Record>,
  ) {}

  async save(record: Record) {
    record.user = this.authService.getCurrentUser();
    return await this.recordRepository.save(record);
  }

  findAll(): Promise<Record[]> {
    return this.recordRepository.findBy({
      user: this.authService.getCurrentUser(),
    });
  }

  async deleteById(id: number): Promise<void> {
    const record = await this.recordRepository.findOneBy({
      id: id,
      user: this.authService.getCurrentUser(),
    });
    record.deleted = true;
    await this.recordRepository.save(record);
  }
}
