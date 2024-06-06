import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserDtoSchema } from './common';
import { UserMapper } from './users.mapper';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async find(@Param('id') userID: string) {
    const rawUser = await this.usersService
      .findBy({ _id: userID })
      .catch((err) => {
        throw new HttpException(
          `User dont exists: ${err}`,
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

    return user;
  }

  @Post('create')
  async create(@Body() body: CreateUserDto) {
    const checkBody = CreateUserDtoSchema.safeParse(body);

    if (!checkBody.success) {
      throw new HttpException(checkBody.error, HttpStatus.NOT_ACCEPTABLE);
    }

    const bodyChecked = checkBody.data;

    const age = new Date().getFullYear() - bodyChecked.birthdate.getFullYear();

    if (age < 20) {
      throw new HttpException('Invalid birthdate.', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.usersService.create({
      ...bodyChecked,
      age,
    });

    return createdUser._id;
  }
}
