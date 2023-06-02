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
    @Query('perPage') perPage: number,
    @Query('sortBy') sortBy: string,
  ) {
    return await this.recordService.findAll(page, perPage, sortBy);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return await this.recordService.deleteById(id);
  }
}
