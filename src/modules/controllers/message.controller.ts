import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { SendMessageForm } from 'src/models/send-message.form';
import { Telegraf, Context as TelegrafContext } from 'telegraf';
import {
  ISubscribersService,
  SUBSCRIBERS_SERVICE_TOKEN,
} from '../subscribers/subscribers.service.interface';

@Controller(`api/message`)
export class MessageController {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    @Inject(SUBSCRIBERS_SERVICE_TOKEN)
    private readonly subscribersService: ISubscribersService,
  ) {}

  @Post(`/send`)
  @HttpCode(200)
  public async sendMessageToUsers(
    @Body() sendMessageForm: SendMessageForm,
  ): Promise<any> {
    return await Promise.all(
      sendMessageForm.chatId.map(async (chatId) => {
        try {
          await this.bot.telegram.sendMessage(chatId, sendMessageForm.text);
        } catch (e) {
          if (e.response.error_code === 403) {
            await this.subscribersService.deleteSubscriber(chatId);
          }
        }
      }),
    );
  }

  @Get(`/subscriptions`)
  @HttpCode(200)
  public async getSubscriptions(): Promise<any> {
    return await this.subscribersService.getAllSubscribers();
  }
}
