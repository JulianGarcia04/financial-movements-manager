import { z } from 'zod';

export const EnvSchema = z.object({
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_VERIFY_SERVICE: z.string(),
  DB_URI: z.string().url(),
  JWT_SECRET: z.string(),
});
