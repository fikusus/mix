import { Global, Module } from '@nestjs/common';
import { SUBSCRIBERS_SERVICE_TOKEN } from './subscribers.service.interface';
import { SUBSCRIBERS_REPOSITORY_TOKEN } from './subscribers.repository.interface';
import { SubscribersService } from './subscribers.service';
import { SubscribersRepository } from './subscribers.repository';

@Global()
@Module({
  providers: [
    {
      provide: SUBSCRIBERS_SERVICE_TOKEN,
      useClass: SubscribersService,
    },
    {
      provide: SUBSCRIBERS_REPOSITORY_TOKEN,
      useClass: SubscribersRepository,
    },
  ],
  exports: [SUBSCRIBERS_SERVICE_TOKEN, SUBSCRIBERS_REPOSITORY_TOKEN],
})
export class SubscribersModule {}
