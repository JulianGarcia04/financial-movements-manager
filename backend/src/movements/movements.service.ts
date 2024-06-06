import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from './movements.schema';
import { Model } from 'mongoose';
import { CreateMovementServiceDto } from './common';

@Injectable()
export class MovementsService {
  constructor(@InjectModel(Movement.name) private userModel: Model<Movement>) {}

  async create(movementDto: CreateMovementServiceDto) {
    const createdMovement = new this.userModel(movementDto);

    return await createdMovement.save();
  }

  async findAll(filters?: { type?: 'entry' | 'egress'; user_id?: string }) {
    return await this.userModel.find(filters);
  }

  async findPaginate(
    skip: number,
    limit: number,
    filters?: { type?: 'entry' | 'egress'; user_id?: string },
  ) {
    return await this.userModel.find(filters).skip(skip).limit(limit);
  }

  async delete(movementID: string) {
    return await this.userModel.findByIdAndDelete(movementID);
  }
}
