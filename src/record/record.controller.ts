import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecordRequest } from './record.request.dto';
import { RecordService } from './record.service';

@Controller('records')
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Get()
  create(@Body() recordRequest: RecordRequest) {}
}
