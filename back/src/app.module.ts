import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmoCRMModule } from './amocrm/amocrm.module';
// import { DatabaseModule } from './database/database.module';
import configuration from './configurations/index';
// const ormconfig = require('../orm.config');

// import ormconfig from '../orm.config'

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
        // username: 'root',
        username: configService.get('db.username'),
        // password: 'admin',
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: configService.get('db.entities'),
        synchronize: configService.get('db.synchronize'),
        // retryAttempts: 3,
      }),
      inject: [ConfigService],
      // type: process.env.DB_TYPE,
      // db_host: process.env.DB_HOST,
      // db_port: parseInt(process.env.DB_PORT, 10) || 5432,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: 
    }),
    // DatabaseModule,
    AmoCRMModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
