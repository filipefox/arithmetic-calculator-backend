import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserCreditService } from './user.credit.service';

@Controller({ path: 'users/credits', version: '1' })
@UseGuards(AuthGuard)
export class UserCreditController {
  constructor(private userCreditService: UserCreditService) {}

  @Get()
  async getCredits(): Promise<number> {
    return await this.userCreditService.getCredits();
  }
}
