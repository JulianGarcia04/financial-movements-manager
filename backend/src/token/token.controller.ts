import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { JwtService } from 'src/common';

@Controller('token')
export class TokenController {
  constructor(private jwtService: JwtService) {}

  @Get('decode/:token')
  async decodeToken(@Param('token') token: string) {
    return await this.jwtService.verifyToken(token).catch((err) => {
      throw new HttpException(
        `Error to verify payload token schema. Error: ${err}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    });
  }
}
