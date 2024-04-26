import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { SendMessageForm } from 'src/models/send-message.form';
import { Telegraf } from 'telegraf';
import { Context as TelegrafContext } from 'telegraf';
import { TelegramService } from '../telegram/telegram.service';
import { TELEGRAM_SERVICE_TOKEN } from '../telegram/telegram.service.interface';

@Controller(`api/message`)
export class MessageController {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    @Inject(TELEGRAM_SERVICE_TOKEN)
    private readonly telegramService: TelegramService,
  ) {}

  @Post(`/send`)
  @HttpCode(200)
  public async sendMessageToUsers(
    @Body() sendMessageForm: SendMessageForm,
  ): Promise<any> {
    return await Promise.all(
      sendMessageForm.chatId.map(async (chatId) => {
        await this.bot.telegram.sendMessage(chatId, sendMessageForm.text);
      }),
    );
  }

  @Get(`/subscriptions`)
  @HttpCode(200)
  public async getSubscriptions(): Promise<any> {
    return await this.telegramService.getSubscriptions();
  }
}
