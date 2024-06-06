import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from './common';
import { UsersService } from './users/users.service';
import { z } from 'zod';
import { UserMapper } from './users/users.mapper';

@Injectable()
export class checkAuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(UsersService) private usersService: UsersService,
  ) {}

  async use(req, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(
        'The authorization header is required',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = await this.jwtService
      .verifyToken(authorization.split(' ')[1])
      .catch((err) => {
        throw new HttpException(
          `Error to parse token payload. Error: ${err}`,
          HttpStatus.UNAUTHORIZED,
        );
      });

    const checkPayload = z
      .object({
        _id: z.string(),
      })
      .safeParse(payload);

    if (!checkPayload.success) {
      throw new HttpException(
        `Error to parse token payload. Error: ${checkPayload.error}`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { _id } = checkPayload.data;

    const user = await this.usersService.findBy({ _id }).catch((err) => {
      throw new HttpException(
        `Error to find the user by id saved in the token. Error: ${err}`,
        HttpStatus.UNAUTHORIZED,
      );
    });

    const checkedUser = UserMapper.safeParse(user);

    if (!checkedUser.success) {
      throw new HttpException(
        `Error to check the user structure. Error: ${checkedUser.error}`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    req.user = user;

    next();
  }
}
