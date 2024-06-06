import { z } from 'zod';

export const CreateUserDtoSchema = z.object({
  username: z.string(),
  birthdate: z.preprocess((val) => {
    if (typeof val !== 'number') {
      return;
    }

    return new Date(val);
  }, z.date()),
  phone: z.string(),
  email: z.string().email(),
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;

export const CreateUserServiceDtoSchema = CreateUserDtoSchema.merge(
  z.object({
    age: z.number().positive().gte(20),
  }),
);

export type CreateUserServiceDto = z.infer<typeof CreateUserServiceDtoSchema>;

export const FindUserByDtoSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
});

export type FindUserByDto = z.infer<typeof FindUserByDtoSchema>;
