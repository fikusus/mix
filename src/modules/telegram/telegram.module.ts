import { Global, Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TELEGRAM_SERVICE_TOKEN } from './telegram.service.interface';

@Global()
@Module({
  providers: [
    {
      provide: TELEGRAM_SERVICE_TOKEN,
      useClass: TelegramService,
    },
  ],
  exports: [TELEGRAM_SERVICE_TOKEN],
})
export class TelegramModule {}
