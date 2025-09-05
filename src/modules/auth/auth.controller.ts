import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post("signup")
  async signUp(@Body() dto: SignUpDto) {
    return this.authService
  }
}
