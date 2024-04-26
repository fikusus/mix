export const TELEGRAM_SERVICE_TOKEN = Symbol.for('telegramService');

export interface ITelegramService {
  addSubscriber(chatId: number): Promise<void>;
  getSubscribers(): Promise<any[]>;
  getSubscriptions(): Promise<any>;
}
