import { Injectable } from '@nestjs/common';
import { CreateUserServiceDto, FindUserByDto } from './common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserServiceDto) {
    const createdUser = new this.userModel(dto);
    return await createdUser.save();
  }

  findBy(opt: FindUserByDto) {
    return this.userModel.findOne(opt);
  }

  async deleteById(userUID: string): Promise<any> {
    return await this.userModel.deleteOne({
      _id: userUID,
    });
  }
}
