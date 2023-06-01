import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation.entity';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  providers: [OperationService],
  controllers: [OperationController],
})
export class OperationModule {}
