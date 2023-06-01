import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation.entity';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { RecordModule } from '../record/record.module';
import { UserCreditModule } from '../user.credit/user.credit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    RecordModule,
    UserCreditModule,
  ],
  providers: [OperationService],
  controllers: [OperationController],
  exports: [OperationService],
})
export class OperationModule {}
