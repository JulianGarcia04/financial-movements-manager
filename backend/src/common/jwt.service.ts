import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  generateToken(
    payload: object,
    opt: {
      expiresIn: string | number;
    },
  ) {
    return sign(payload, this.configService.get<string>('JWT_SECRET'), opt);
  }

  async verifyToken(token: string) {
    return await verify(token, this.configService.get<string>('JWT_SECRET'));
  }
}
