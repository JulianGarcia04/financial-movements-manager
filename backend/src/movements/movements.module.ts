import { Module } from '@nestjs/common';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movement, MovementSchema } from './movements.schema';

@Module({
  controllers: [MovementsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Movement.name,
        schema: MovementSchema,
      },
    ]),
  ],
  providers: [MovementsService],
})
export class MovementsModule {}
