import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: false })
  avatarSrc: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false })
  firstname: string;

  @Prop({ required: false })
  lastname: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
