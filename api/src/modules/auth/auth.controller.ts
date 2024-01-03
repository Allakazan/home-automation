import { Controller, Req, Post, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { Public } from '@/common/decorators/IsPublic';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
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

  @Post('logout')
  @ApiBearerAuth()
  async logout(@Req() req: Request) {
    return this.authService.logout(req.user['sub']);
  }

  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
