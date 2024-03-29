import { Module } from '@nestjs/common';
import { AmoCRMService } from './amocrm.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AmoCRMService],
  exports: [AmoCRMService],
})

export class AmoCRMModule {}