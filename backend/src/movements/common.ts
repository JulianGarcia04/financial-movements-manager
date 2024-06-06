import { z } from 'zod';

export const CreateMovementDtoSchema = z.object({
  ammount: z.number().positive(),
  type: z.enum(['entry', 'egress']),
  description: z.string().optional(),
});

export type CreateMovementDto = z.infer<typeof CreateMovementDtoSchema>;

export const CreateMovementServiceDtoSchema = CreateMovementDtoSchema.merge(
  z.object({
    user_id: z.string(),
  }),
);

export type CreateMovementServiceDto = z.infer<
  typeof CreateMovementServiceDtoSchema
>;

export const FindMovementsDtoSchema = z.object({
  limit: z
    .preprocess((val) => {
      if (typeof val !== 'string') {
        return;
      }

      const valToNumber = Number(val);

      if (Number.isNaN(valToNumber)) {
        return;
      }

      return valToNumber;
    }, z.number())
    .optional(),
  skip: z
    .preprocess((val) => {
      if (typeof val !== 'string') {
        return;
      }

      const valToNumber = Number(val);

      if (Number.isNaN(valToNumber)) {
        return;
      }

      return valToNumber;
    }, z.number())
    .optional(),
  type: z.enum(['entry', 'egress']).optional(),
  user_id: z.string().optional(),
});

export type FindMovementsDto = z.infer<typeof FindMovementsDtoSchema>;
