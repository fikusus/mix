import { SubscriberDTO } from 'src/models/dto/subscriber.dto';

export const SUBSCRIBERS_REPOSITORY_TOKEN = Symbol.for('subscribersRepository');

export interface ISubscribersRepository {
  createSubscriber(subscriber: SubscriberDTO): Promise<void>;
  getSubscriberByChatId(chatId: number): Promise<SubscriberDTO>;
  getAllSubscribers(): Promise<SubscriberDTO[]>;
  deleteSubscriber(chatId: number): Promise<void>;
}
