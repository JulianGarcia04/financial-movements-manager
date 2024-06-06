import { z } from 'zod';

export const AuthLoginByEmailDtoSchema = z.object({
  email: z.string().email(),
});

export type AuthLoginByEmailDto = z.infer<typeof AuthLoginByEmailDtoSchema>;

export const AuthLoginByVerifyCodeDtoSchema = z.object({
  code: z.string().length(6),
  token: z.string(),
});

export type AuthLoginByVerifyCodeDto = z.infer<
  typeof AuthLoginByVerifyCodeDtoSchema
>;

export const AuthTokenPayload = z.object({
  phone: z.string(),
  _id: z.string(),
});
