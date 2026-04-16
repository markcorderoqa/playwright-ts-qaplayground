import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  APP_ENV: z.enum(['dev', 'staging', 'prod']).default('dev'),
  BASE_URL: z.string().url().default('https://www.qaplayground.com'),
  CI: z.string().optional(),
  AUTH_LOGIN_PATH: z.string().default('/login'),
  AUTH_USERNAME_SELECTOR: z.string().default('input[name="email"]'),
  AUTH_PASSWORD_SELECTOR: z.string().default('input[name="password"]'),
  AUTH_SUBMIT_SELECTOR: z.string().default('button[type="submit"]'),
  AUTH_POST_LOGIN_PATH: z.string().optional(),
  AUTH_ADMIN_USERNAME: z.string().optional(),
  AUTH_ADMIN_PASSWORD: z.string().optional(),
  AUTH_MANAGER_USERNAME: z.string().optional(),
  AUTH_MANAGER_PASSWORD: z.string().optional(),
  AUTH_MEMBER_USERNAME: z.string().optional(),
  AUTH_MEMBER_PASSWORD: z.string().optional(),
  AUTH_MEMBER_1_USERNAME: z.string().optional(),
  AUTH_MEMBER_1_PASSWORD: z.string().optional(),
  AUTH_MEMBER_2_USERNAME: z.string().optional(),
  AUTH_MEMBER_2_PASSWORD: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
}

export const env = parsed.data;
