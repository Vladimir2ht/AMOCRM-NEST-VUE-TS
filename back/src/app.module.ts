import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmoCRMModule } from './amocrm/amocrm.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configurations/index';

@Module({
  imports: [
    AmoCRMModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
