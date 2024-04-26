import { Controller, Inject } from '@nestjs/common';
import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  Command,
  Message,
} from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramService } from '../telegram/telegram.service';
import { TELEGRAM_SERVICE_TOKEN } from '../telegram/telegram.service.interface';

@Update()
export class TelegramController {
  constructor(
    @Inject(TELEGRAM_SERVICE_TOKEN)
    private readonly telegramService: TelegramService,
  ) {}

  @Start()
  async handleStart(@Ctx() ctx: Context): Promise<void> {
    console.log(ctx);
    await this.telegramService.addSubscriber(ctx.chat.id);
    await ctx.reply('Ви підписані на глобальні повідомлення!');
  }

  @Command('chatid')
  async handleChatId(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply(`Ваш Chat ID: ${ctx.chat.id}`);
  }

  @Command('send')
  async handleSend(@Ctx() ctx: Context): Promise<void> {
    /*const messageParts = ctx.message.text.split(' ');
    const chatIds = messageParts[1].split(',');
    const message = messageParts.slice(2).join(' ');
    chatIds.forEach(async (chatId: string) => {
      await ctx.telegram.sendMessage(parseInt(chatId), message);
    });*/
  }

  @On('message')
  async handleMessage(
    @Ctx() ctx: Context,
    @Message('text') messageText: string,
  ): Promise<void> {
    if (messageText.startsWith('/') || ctx.message.chat.type !== 'private') {
      return;
    }
    const subscribers = await this.telegramService.getSubscribers();
    const senderChatId = ctx.chat.id;
    subscribers.forEach(async (subscriber) => {
      if (subscriber.chat_id !== senderChatId) {
        await ctx.telegram.forwardMessage(
          subscriber.chat_id,
          senderChatId,
          ctx.message.message_id,
        );
      }
    });
   /* await this.telegramService.saveMessage(
      senderChatId,
      ctx.message.message_id,
    );*/
  }
}

/*@On('text')
async handleReply(@Ctx() ctx: Context): Promise<void> {
if (ctx.message.reply_to_message) {
const originalMessage = await this.telegramService.getMessageById(ctx.message.reply_to_message.message_id);
if (originalMessage) {
await ctx.telegram.sendMessage(originalMessage.chat_id, Відповідь: ${ctx.message.text}, {
reply_to_message_id: ctx.message.reply_to_message.message_id
});
}
}
}
}*/
