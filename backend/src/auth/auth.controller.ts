import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  AuthLoginByVerifyCodeDtoSchema,
  AuthLoginByEmailDtoSchema,
  AuthTokenPayload,
} from './common';
import { UsersService } from 'src/users/users.service';
import { JwtService, TwilioService } from 'src/common';
import { UserMapper } from 'src/users/users.mapper';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private twilioService: TwilioService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(202)
  async loginByEmail(@Body() body) {
    const checkBody = AuthLoginByEmailDtoSchema.safeParse(body);
    if (!checkBody.success) {
      throw new HttpException(checkBody.error, HttpStatus.NOT_ACCEPTABLE);
    }

    const { email } = checkBody.data;

    const user = await this.usersService.findBy({ email });

    if (!user) {
      throw new HttpException('User not found by email', HttpStatus.NOT_FOUND);
    }

    const { valid, status } = await this.twilioService.sendVerifyToken(
      user.phone,
    );

    const token = this.jwtService.generateToken(
      {
        phone: user.phone,
        _id: user._id,
      },
      {
        expiresIn: 60 * 5,
      },
    );

    return {
      authStatus: {
        valid,
        status,
      },
      token,
    };
  }

  @Post('login/verify')
  @HttpCode(202)
  async loginByVerifyCode(@Body() body) {
    const checkBody = AuthLoginByVerifyCodeDtoSchema.safeParse(body);

    if (!checkBody.success) {
      throw new HttpException(
        `body schema error: ${checkBody.error}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const { code, token } = checkBody.data;

    const payload = await this.jwtService.verifyToken(token).catch((err) => {
      throw new HttpException(
        `Token exprired. ${err}`,
        HttpStatus.UNAUTHORIZED,
      );
    });

    if (!payload) {
      throw new HttpException('Token exprired', HttpStatus.UNAUTHORIZED);
    }

    const checkPayload = AuthTokenPayload.safeParse(payload);

    if (!checkPayload.success) {
      throw new HttpException(
        `Error to verify payload token schema. Error: ${checkPayload.error}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const { phone, _id } = checkPayload.data;

    const { status, valid } = await this.twilioService.verifyCodeSent(
      phone,
      code,
    );

    if (status === 'pending' && !valid) {
      throw new HttpException(
        'Invalid verification code',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const rawUser = await this.usersService
      .findBy({
        _id,
      })
      .catch((err) => {
        throw new HttpException(
          `User not found by email. Error: ${err}`,
          HttpStatus.NOT_FOUND,
        );
      });

    const checkUser = UserMapper.safeParse(rawUser);

    if (!checkUser.success) {
      throw new HttpException(
        `Error to parse the user. Error: ${checkUser.error}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const user = checkUser.data;

    const authToken = this.jwtService.generateToken(
      {
        _id,
      },
      {
        expiresIn: 60 * 60,
      },
    );

    return {
      authToken,
      user,
    };
  }
}
