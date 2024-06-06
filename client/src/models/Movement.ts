import { z } from 'zod';

export const MovementSchema = z.object({
  _id: z.string(),
  ammount: z.number().positive(),
  type: z.enum(['entry', 'egress']),
  description: z.string().optional(),
  user_id: z.string(),
  createdAt: z.preprocess((val) => {
    if (typeof val !== 'string') {
      return;
    }

    return new Date(val);
  }, z.date()),
});

export type Movement = z.infer<typeof MovementSchema>;

export const CreateMovementSchema = z.object({
  ammount: z.number().positive(),
  type: z.enum(['entry', 'egress']),
  description: z.preprocess((val) => {
    if (typeof val !== 'string') {
      return;
    }

    if (val.length === 0) {
      return;
    }

    return val;
  }, z.string().optional()),
});
