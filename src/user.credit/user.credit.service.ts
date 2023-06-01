import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredit } from './user.credit.entity';
import { User } from '../user/user.entity';

@Injectable()
export class UserCreditService {
  constructor(
    @InjectRepository(UserCredit)
    private userCreditRepository: Repository<UserCredit>,
  ) {}

  async decreaseUserCredit(user: User, amount: number): Promise<UserCredit> {
    const userCredit = await this.userCreditRepository.findOneBy({
      user: user,
    });
    userCredit.value -= amount;

    return await this.userCreditRepository.save(userCredit);
  }
}
