import { InjectKnex, Knex } from 'nestjs-knex';
import { ITelegramService } from './telegram.service.interface';

export class TelegramService implements ITelegramService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  public async addSubscriber(chat: any): Promise<void> {
    const chatId = chat.id;
    const exists = await this.knex('subscribers')
      .where({ chat_id: chatId })
      .first();
    if (!exists) {
      let name = '';
      const chatType = chat.type;
      if (chatType === 'private') {
        name = `${chat.first_name} ${chat.last_name}`;
      }
      if (chatType === 'group' || chatType === 'supergroup') {
        name = chat.title;
      }
      await this.knex('subscribers').insert({
        chat_id: chatId,
        name,
        type: chatType,
      });
    }
  }

  public async getSubscribers(): Promise<any[]> {
    return this.knex('subscribers').select('chat_id');
  }

  public async saveMessage(chatId: number, messageId: number): Promise<void> {
    await this.knex('messages').insert({
      chat_id: chatId,
      message_id: messageId,
    });
  }

  public async getMessageById(messageId: number): Promise<any> {
    return this.knex('messages').where({ message_id: messageId }).first();
  }

  public async getSubscriptions(): Promise<any> {
    return this.knex('subscribers').select('*');
  }
}
