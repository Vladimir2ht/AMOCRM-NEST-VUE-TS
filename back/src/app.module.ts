import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmoCRMModule } from './amocrm/amocrm.module';
// import { DatabaseModule } from './database/database.module';
import configuration from './configurations/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<PostgresConnectionOptions> => ({
        type: configService.get('db.type'),
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: configService.get('db.entities'),
        synchronize: configService.get('db.synchronize'),
        // autoLoadEntities: true,
        // retryAttempts: 3,
      }),
      inject: [ConfigService],

    }),
    // DatabaseModule,
    AmoCRMModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
