import { Module } from '@nestjs/common';

import { ControllersModule } from './modules/controllers/controllers.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { KnexModule } from 'nestjs-knex';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SubscribersModule } from './modules/subscribers/subscribers.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'telegram-message-sender', 'dist'),
    }),
    TelegrafModule.forRoot({
      token: '6865099618:AAHx7h8Md_kXJAO1We2E-QnRr7kSRk3QabY', // замініть на ваш токен
    }),
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        connection: {
          host: '127.0.0.1',
          user: 'mix',
          password: 'mix',
          database: 'mix',
        },
      },
    }),
    ControllersModule,
    SubscribersModule,
  ],
})
export class AppModule {}
