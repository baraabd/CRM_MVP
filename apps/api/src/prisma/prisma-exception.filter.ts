import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Response } from 'express';

interface PrismaErrorBody {
  statusCode: number;
  message: string;
  code: string;
  meta?: Prisma.PrismaClientKnownRequestError['meta'];
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.BAD_REQUEST;
    let message = exception.message;

    // Unique constraint (e.g. email unique)
    if (exception.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      message = 'Resource already exists (unique constraint).';
    }

    // Not found on update/delete
    if (exception.code === 'P2025') {
      status = HttpStatus.NOT_FOUND;
      message = 'Resource not found.';
    }

    const body: PrismaErrorBody = {
      statusCode: status,
      message,
      code: exception.code,
      meta: exception.meta,
    };

    return res.status(status).json(body);
  }
}
