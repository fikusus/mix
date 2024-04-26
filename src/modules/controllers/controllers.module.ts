import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { MessageController } from './message.controller';

@Module({
  imports: [],
  providers: [TelegramController],
  controllers: [MessageController],
})
export class ControllersModule {}
