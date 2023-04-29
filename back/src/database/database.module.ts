import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './connection.service';
import { DbController } from './db.controller.controller';

@Module({
  imports: [ConfigModule],
  controllers: [DbController],
  providers: [DatabaseService],
  exports: [DbController],
})
export class DatabaseModule {}
