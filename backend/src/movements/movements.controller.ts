import {
  Controller,
  HttpException,
  HttpStatus,
  Query,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDtoSchema, FindMovementsDtoSchema } from './common';
import { MovementMapper } from './movements.mapper';
import { currentUser, CurrentUser } from 'src/common/currentUser.decorator';

@Controller('movements')
export class MovementsController {
  constructor(private movementsService: MovementsService) {}

  @Get('find')
  async findMovements(@Query() query) {
    const checkQuery = FindMovementsDtoSchema.safeParse(query);

    if (!checkQuery.success) {
      throw new HttpException(
        `invalid query object. Error: ${checkQuery.error}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const { limit, skip, ...filters } = checkQuery.data;

    const movements =
      limit && skip
        ? await this.movementsService.findPaginate(skip, limit, filters)
        : await this.movementsService.findAll(filters);

    return movements.map((mov) => {
      return MovementMapper.parse(mov);
    });
  }

  @Post('create')
  async create(@Body() body, @CurrentUser() currUser: currentUser) {
    const checkBody = CreateMovementDtoSchema.safeParse(body);

    if (!checkBody.success) {
      throw new HttpException(
        `Invalid body schema. Error: ${checkBody.error}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const createdMovement = await this.movementsService.create({
      ...checkBody.data,
      user_id: currUser._id,
    });

    return createdMovement._id;
  }
}
