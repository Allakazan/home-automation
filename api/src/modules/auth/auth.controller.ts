import { Controller, Req, Post, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { AuthService } from './auth.service';

import { Public } from '@/common/decorators/IsPublic';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as Omit<User, 'password'>);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req: Request) {
    return this.authService.refreshSession(
      req.user['sub'],
      req.user['email'],
      req.user['refreshToken'],
    );
  }

  @Public()
  @Post('logout')
  async logout(@Req() req: Request) {
    // Delete refresh token
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
