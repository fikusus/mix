import { LoggerService } from '@nestjs/common';
import * as moment from 'moment';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as Transport from 'winston-transport';

export const fileFormatter = winston.format.printf(
  ({ level, timestamp, context, message, stack }) => {
    return `${level.toUpperCase()} ${moment(timestamp).format(
      'MMM Do YYYY, h:mm:ss a',
    )} [${context}] ${message} ${stack ? `\n${stack}` : ''}`;
  },
);

export const createLogger = () => {
  const transports: Transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
  ];

  const logger: LoggerService = WinstonModule.createLogger({
    transports,
    level: 'info',
  });

  return logger;
};
