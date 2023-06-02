import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCredit } from './user.credit.entity';
import { UserCreditService } from './user.credit.service';
import { AuthModule } from '../auth/auth.module';
import { RecordController } from '../record/record.controller';
import { UserCreditController } from './user.credit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserCredit]), AuthModule],
  providers: [UserCreditService],
  controllers: [UserCreditController],
  exports: [UserCreditService],
})
export class UserCreditModule {}
