import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtService, TwilioService } from 'src/common';

@Module({
  controllers: [AuthController],
  providers: [TwilioService, JwtService],
})
export class AuthModule {}
