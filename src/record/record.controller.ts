import { Body, Controller, Post } from "@nestjs/common";
import { Record, RecordType } from "./record.entity";
import { RecordRequest } from "./record.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppService } from "../app.service";
import { RecordService } from "./record.service";

@Controller('records')
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Post()
  create(@Body() recordRequest: RecordRequest) {
    this.recordService.save()
  }
}
