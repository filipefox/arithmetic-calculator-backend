import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCredit } from './user.credit.entity';
import { UserCreditService } from './user.credit.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserCredit]), AuthModule],
  providers: [UserCreditService],
  exports: [UserCreditService],
})
export class UserCreditModule {}
