import { Body, Controller, Post } from "@nestjs/common";
import { User, UserType } from "./user.entity";
import { UserRequest } from "./user.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppService } from "../app.service";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userRequest: UserRequest) {
    this.userService.save()
  }
}
