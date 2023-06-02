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

  async findAll(page: number, perPage: number, sortBy: string) {
    const skip = (page - 1) * perPage;
    const take = perPage;
    const order = { [sortBy]: 'ASC' };

    const [records, count] = await this.recordRepository.findAndCount({
      where: { user: this.authService.getCurrentUser() },
      skip,
      take,
      order,
    });

    return { records: records, count: count };
  }

  async deleteById(id: number): Promise<void> {
    await this.recordRepository.softDelete({
      id: id,
      user: this.authService.getCurrentUser(),
    });
  }
}
