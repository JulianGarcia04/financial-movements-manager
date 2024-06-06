import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovementDocument = HydratedDocument<Movement>;

@Schema()
export class Movement {
  @Prop({ required: true })
  ammount: number;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  type: 'entry' | 'egress';

  @Prop({ required: true })
  user_id: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
