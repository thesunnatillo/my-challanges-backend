import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogInDto } from './dto/login.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  logIn(@Body() logInDto: LogInDto) {
    return this.authService.login(logInDto);
  }

  @Post('logout')
  logOut(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.logout(token);
  }
}
