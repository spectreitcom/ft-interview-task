import * as joi from 'joi';

export const envSchema = joi.object({
  DATABASE_URL: joi.string().required(),
  AWS_REGION: joi.string().required(),
  AWS_ACCESS_KEY_ID: joi.string().required(),
  AWS_SECRET_ACCESS_KEY: joi.string().required(),
  AWS_BUCKET: joi.string().required(),
  REDIS_URL: joi.string().required(),
});
