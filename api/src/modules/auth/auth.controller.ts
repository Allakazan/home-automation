import { Controller, Req, Post, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { AuthService } from './auth.service';

import { Public } from '@/common/decorators/IsPublic';
import { LocalAuthGuard } from './guards/local-auth.guard';
//import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as Omit<User, 'password'>);
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
