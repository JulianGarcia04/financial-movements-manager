import { z } from 'zod';

export const UserMapper = z.object({
  username: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  phone: z.string(),
  birthdate: z.date(),
  email: z.string(),
  age: z.number(),
});
