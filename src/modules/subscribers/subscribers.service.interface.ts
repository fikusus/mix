import { SubscriberDTO } from 'src/models/dto/subscriber.dto';

export const SUBSCRIBERS_SERVICE_TOKEN = Symbol.for('subscribersService');

export interface ISubscribersService {
  addSubscriber(chat: any): Promise<void>;
  getAllSubscribers(): Promise<SubscriberDTO[]>;
  deleteSubscriber(chatId: number): Promise<void>;
}
