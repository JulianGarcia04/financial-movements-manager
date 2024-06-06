import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  phone: z.string(),
  birthdate: z.preprocess((val) => {
    if (typeof val !== 'string') {
      return;
    }

    return new Date(val);
  }, z.date()),
  email: z.string(),
  age: z.number(),
});

export type User = z.infer<typeof UserSchema>;
