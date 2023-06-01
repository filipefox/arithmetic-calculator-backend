import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCredit } from './user.credit.entity';
import { UserCreditService } from './user.credit.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCredit])],
  providers: [UserCreditService],
  exports: [UserCreditService],
})
export class UserCreditModule {}
