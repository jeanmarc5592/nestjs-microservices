import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../../../libs/common/src/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expirationString = this.configService.get<string>('JWT_EXPIRATION');
    const expriationSeconds = parseInt(expirationString, 10);

    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);
    tokenExpiration.setSeconds(
      tokenExpiration.getSeconds() + expriationSeconds,
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: tokenExpiration,
    });

    return token;
  }
}
