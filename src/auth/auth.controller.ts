import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: Record<string, string>) {
    return this.authService.login(loginDto.username, loginDto.password);
  }
}
