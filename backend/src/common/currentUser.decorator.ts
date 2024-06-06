import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/users.schema';

export interface currentUser extends User {
  _id: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // extract token from request
  },
);
