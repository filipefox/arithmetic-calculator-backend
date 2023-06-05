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

  async findAll(
    page: number,
    rowsPerPage: number,
    sortBy: string,
    descending: string,
  ) {
    const skip = (page - 1) * rowsPerPage;
    const [records, numberOfRecords] = await this.recordRepository.findAndCount(
      {
        where: { user: this.authService.getCurrentUser() },
        take: rowsPerPage,
        skip: skip,
        order: { [sortBy]: descending },
      },
    );

    return { rows: records, rowsNumber: numberOfRecords };
  }

  async deleteById(id: number): Promise<void> {
    await this.recordRepository.softDelete({
      id: id,
      user: this.authService.getCurrentUser(),
    });
  }
}
