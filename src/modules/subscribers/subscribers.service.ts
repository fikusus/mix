import { ISubscribersService } from './subscribers.service.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  SUBSCRIBERS_REPOSITORY_TOKEN,
  ISubscribersRepository,
} from './subscribers.repository.interface';
import { SubscriberDTO } from 'src/models/dto/subscriber.dto';

export class SubscribersService implements ISubscribersService {
  constructor(
    @Inject(SUBSCRIBERS_REPOSITORY_TOKEN)
    private readonly subscribersRepository: ISubscribersRepository,
  ) {}

  public async deleteSubscriber(chatId: number): Promise<void> {
    await this.subscribersRepository.deleteSubscriber(chatId);
  }

  public async addSubscriber(chat: any): Promise<void> {
    const { id: chatId, type: chatType } = chat;
    const subscriber =
      await this.subscribersRepository.getSubscriberByChatId(chatId);
    if (subscriber) {
      throw new BadRequestException('Ви вже підписані!');
    }
    let name = '';
    if (chatType === 'private') {
      name = `${chat.first_name} ${chat.last_name}`;
    }
    if (chatType === 'group' || chatType === 'supergroup') {
      name = chat.title;
    }
    await this.subscribersRepository.createSubscriber({
      chat_id: chatId,
      name,
      type: chatType,
    });
  }

  public async getAllSubscribers(): Promise<SubscriberDTO[]> {
    return this.subscribersRepository.getAllSubscribers();
  }
}
