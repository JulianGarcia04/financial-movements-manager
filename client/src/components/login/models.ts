import { UserSchema } from 'src/models/User';
import { z } from 'zod';

export const LoginFirstStepByEmailResponseSchema = z.object({
  authStatus: z.object({
    valid: z.boolean(),
    status: z.enum(['pending', 'approve']),
  }),
  token: z.string(),
});

export type LoginFirstStepByEmailResponse = z.infer<
  typeof LoginFirstStepByEmailResponseSchema
>;

export const LoginFirstStepDecodeTokenResponseSchema = z.object({
  phone: z.string(),
  _id: z.string(),
});

export type LoginFirstStepDecodeTokenResponse = z.infer<
  typeof LoginFirstStepDecodeTokenResponseSchema
>;

export const LoginSecondStepVerifyCodeResponseSchema = z.object({
  authToken: z.string(),
  user: UserSchema,
});

export type LoginSecondStepVerifyCodeResponse = z.infer<
  typeof LoginSecondStepVerifyCodeResponseSchema
>;

export interface OnSignInByEmailEventHandler
  extends LoginFirstStepByEmailResponse {
  userData: LoginFirstStepDecodeTokenResponse;
}
