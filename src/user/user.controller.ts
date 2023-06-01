import { Body, Controller, Post } from '@nestjs/common';
import { UserRequest } from './user.request.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userRequest: UserRequest) {
    this.userService.save();
  }
}
