import mongoose from 'mongoose';
import { z } from 'zod';

export const MovementMapper = z.object({
  _id: z.preprocess((value) => {
    if (value instanceof mongoose.Types.ObjectId) {
      return value.toString();
    }

    if (typeof value !== 'string') {
      return;
    }

    return value;
  }, z.string()),
  ammount: z.number().positive(),
  type: z.enum(['entry', 'egress']),
  description: z.string().optional(),
  user_id: z.string(),
  createdAt: z.date(),
});
