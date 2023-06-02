import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), AuthModule],
  providers: [RecordService],
  controllers: [RecordController],
  exports: [RecordService],
})
export class RecordModule {}
