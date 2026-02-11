import { HttpStatus } from '@nestjs/common';

// Here we can define more error codes
export type AppErrorCode =
  | 'ENTITY_NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'ALREADY_EXISTS'
  | 'UNAUTHORIZED';

export const codeToStatus: Record<AppErrorCode, number> = {
  ENTITY_NOT_FOUND: HttpStatus.NOT_FOUND,
  VALIDATION_ERROR: HttpStatus.BAD_REQUEST,
  ALREADY_EXISTS: HttpStatus.BAD_REQUEST,
  UNAUTHORIZED: HttpStatus.UNAUTHORIZED,
};

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message?: string,
  ) {
    super(message);
  }
}

export * from './http-exception.filter';
