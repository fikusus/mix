import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

function shouldLogAsError(statusCode: number): boolean {
  return (
    statusCode === HttpStatus.FORBIDDEN ||
    (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR && statusCode <= 599)
  );
}

/**
 * Logs the request error
 * @param error Error object
 * @param context details about the current request
 */
export const logRequestError = (
  logger: Logger,
  error: Error,
  context: ExecutionContext,
  ctxPrefix: string,
): void => {
  const req: Request = context.switchToHttp().getRequest<Request>();
  const { method, url } = req;
  const body = getRequestBody(req);

  if (error instanceof HttpException) {
    const statusCode: number = error.getStatus();
    const ctx: string = `${ctxPrefix} - ${statusCode} - ${method} - ${url}`;
    const message: string = `Outgoing response - ${statusCode} - ${method}`;

    const messagePayload = {
      method,
      url,
      body,
      message,
      error,
    };

    if (shouldLogAsError(statusCode)) {
      logger.error(messagePayload, error.stack, ctx);
    } else {
      logger.warn(messagePayload, ctx);
    }
  } else {
    logger.error(
      {
        message: `Outgoing response - ${method} - ${url}`,
      },
      error.stack,
      `${ctxPrefix} - ${method} - ${url}`,
    );
  }
};

/**
 * Logs the request response in success cases
 * @param body body returned
 * @param context details about the current request
 */
export const logRequestResponse = (
  logger: Logger,
  body: unknown,
  context: ExecutionContext,
  ctxPrefix: string,
): void => {
  const req: Request = context.switchToHttp().getRequest<Request>();
  const res: Response = context.switchToHttp().getResponse<Response>();
  const { method, url } = req;
  const { statusCode } = res;
  const ctx: string = `${ctxPrefix} - ${statusCode} - ${method} - ${url}`;
  const message: string = `Outgoing response - ${statusCode} - ${method} - ${url}`;

  logger.log(
    {
      message,
    },
    ctx,
  );
};

/**
 * Get the request body for allowed URLs
 * @param request request
 * @returns {string} body of request
 */
export const getRequestBody = (request: Request): string => {
  return request.body;
};
