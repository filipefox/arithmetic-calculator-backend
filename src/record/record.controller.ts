import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller({ path: 'records', version: '1' })
@UseGuards(AuthGuard)
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('rowsPerPage') rowsPerPage: number,
    @Query('sortBy') sortBy: string,
    @Query('descending') descending: string,
  ) {
    return await this.recordService.findAll(
      page,
      rowsPerPage,
      sortBy,
      descending,
    );
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return await this.recordService.deleteById(id);
  }
}
