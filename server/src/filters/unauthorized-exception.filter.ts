import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { Response } from 'express';

@Catch(ForbiddenException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status);
    response.send({
      isError: true,
      message: "Unauthorized access, please login!"
    });
  }
}