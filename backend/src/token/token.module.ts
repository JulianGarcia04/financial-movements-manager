import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { JwtService } from 'src/common';

@Module({
  controllers: [TokenController],
  providers: [JwtService],
})
export class TokenModule {}
