import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation.entity';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { RecordModule } from '../record/record.module';
import { UserCreditModule } from '../user.credit/user.credit.module';
import { HttpModule } from '@nestjs/axios';
import { RandomOrgService } from '../random/random-org.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    HttpModule,
    RecordModule,
    UserCreditModule,
  ],
  providers: [OperationService, RandomOrgService],
  controllers: [OperationController],
  exports: [OperationService],
})
export class OperationModule {}
