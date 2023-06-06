import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredit } from './user.credit.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserCreditService {
  constructor(
    @InjectRepository(UserCredit)
    private userCreditRepository: Repository<UserCredit>,
    private authService: AuthService,
  ) {}

  async getCredits(): Promise<number> {
    const user = this.authService.getCurrentUser();
    const userCredit = await this.userCreditRepository.findOneBy({
      user,
    });
    return userCredit.value;
  }

  async decreaseCredits(amount: number): Promise<UserCredit> {
    const user = this.authService.getCurrentUser();
    const userCredit = await this.userCreditRepository.findOneBy({
      user,
    });

    if (userCredit.value - amount >= 0) {
      userCredit.value -= amount;
      return await this.userCreditRepository.save(userCredit);
    }

    throw new BadRequestException(
      'Not enough credits to carry out the operation',
    );
  }
}
