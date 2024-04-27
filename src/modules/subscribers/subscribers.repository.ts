import { InjectKnex, Knex } from 'nestjs-knex';
import { ISubscribersRepository } from './subscribers.repository.interface';
import { SubscriberDTO } from 'src/models/dto/subscriber.dto';

export class SubscribersRepository implements ISubscribersRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  public async deleteSubscriber(chatId: number): Promise<void> {
    await this.knex('subscribers').delete().where({ chat_id: chatId });
  }

  public async createSubscriber(subscriber: SubscriberDTO): Promise<void> {
    await this.knex('subscribers').insert(subscriber);
  }
  public async getSubscriberByChatId(chatId: number): Promise<SubscriberDTO> {
    return await this.knex('subscribers').where({ chat_id: chatId }).first();
  }
  public async getAllSubscribers(): Promise<SubscriberDTO[]> {
    return this.knex('subscribers').select('*');
  }
}
