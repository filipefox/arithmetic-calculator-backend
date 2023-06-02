import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('records')
@UseGuards(AuthGuard)
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Get()
  async findAll() {
    return await this.recordService.findAll();
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return await this.recordService.deleteById(id);
  }
}
