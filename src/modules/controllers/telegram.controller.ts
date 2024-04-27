import { BadRequestException, Inject } from '@nestjs/common';
import { Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

import {
  SUBSCRIBERS_SERVICE_TOKEN,
  ISubscribersService,
} from '../subscribers/subscribers.service.interface';

@Update()
export class TelegramController {
  constructor(
    @Inject(SUBSCRIBERS_SERVICE_TOKEN)
    private readonly subscribersService: ISubscribersService,
  ) {}

  @Start()
  async handleStart(@Ctx() ctx: Context): Promise<void> {
    const chat = ctx.chat;
    try {
      await this.subscribersService.addSubscriber(chat);
      await ctx.reply('Ви підписані на глобальні повідомлення!');
    } catch (e) {
      if (e instanceof BadRequestException) {
        await ctx.reply(e.message);
      } else {
        await ctx.reply('Щось пішло не так! Спробуйте пізніше!');
      }
    }
  }

  @Command('chatid')
  async handleChatId(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply(`Ваш Chat ID: ${ctx.chat.id}`);
  }

  @On('message')
  async handleMessage(@Ctx() ctx: Context): Promise<void> {
    if (ctx.message.chat.type !== 'private') {
      return;
    }
    const subscribers = await this.subscribersService.getAllSubscribers();
    const senderChatId = ctx.chat.id;
    subscribers.forEach(async (subscriber) => {
      if (subscriber.chat_id !== senderChatId) {
        try {
          await ctx.telegram.forwardMessage(
            subscriber.chat_id,
            senderChatId,
            ctx.message.message_id,
          );
        } catch (e) {
          if (e.response.error_code === 403) {
            await this.subscribersService.deleteSubscriber(subscriber.chat_id);
          }
        }
      }
    });
  }
}
