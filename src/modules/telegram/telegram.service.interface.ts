export const TELEGRAM_SERVICE_TOKEN = Symbol.for('telegramService');

export interface ITelegramService {
  addSubscriber(chat: any): Promise<void>;
  getSubscribers(): Promise<any[]>;
  getSubscriptions(): Promise<any>;
}
