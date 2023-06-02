import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserCreditService } from './user.credit.service';

@Controller('userCredits')
@UseGuards(AuthGuard)
export class UserCreditController {
  constructor(private userCreditService: UserCreditService) {}

  @Get()
  async findAll() {
    //return await this.userCreditService.findAll();
  }
}
