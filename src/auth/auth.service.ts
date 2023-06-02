import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { REQUEST } from '@nestjs/core';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(REQUEST) private request,
  ) {}

  async login(username, password) {
    const user = await this.userService.findByUsername(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  getCurrentUser(): User {
    return new User(this.request.user.sub);
  }
}
