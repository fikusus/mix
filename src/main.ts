import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from './config/logger.factory';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createLogger(),
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
