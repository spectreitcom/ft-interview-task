import * as joi from 'joi';

export const envSchema = joi.object({
  DATABASE_URL: joi.string().required(),
});
