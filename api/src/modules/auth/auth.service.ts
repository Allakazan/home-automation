import { Injectable, ForbiddenException } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { hashed, match } from '@/common/directives/crypto.directive';

export type TokenPayload = {
  email: string;
  sub: string;
};

type TokenReturn = {
  access_token: string;
  refresh_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    protected configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await match(pass, user.password))) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login({ email, id }: Omit<User, 'password'>) {
    return await this.generateTokens(id, email);
  }

  async logout(userId: string) {
    return await this.usersService.updateRefreshToken(userId, null);
  }

  async refreshSession(userId: string, email: string, refreshToken: string) {
    const foundUser = await this.usersService.getRefreshTokenById(userId);

    if (!foundUser || !foundUser.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await match(
      refreshToken,
      foundUser.refreshToken ?? '',
    );

    if (refreshTokenMatches) {
      return await this.generateTokens(userId, email);
    } else {
      throw new ForbiddenException('Access Denied');
    }
  }

  async generateTokens(userId: string, email: string): Promise<TokenReturn> {
    const access_token = this.getAccessToken({ sub: userId, email });
    const refresh_token = this.getRefreshToken({ sub: userId, email });

    await this.usersService.updateRefreshToken(
      userId,
      await hashed(refresh_token),
    );

    return { access_token, refresh_token };
  }

  getAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('CLIENT_SECRET'),
      expiresIn: '15m',
    });
  }

  getRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('CLIENT_SECRET_REFRESH'),
      expiresIn: '7d',
    });
  }
}
