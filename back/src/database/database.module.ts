import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from 'src/db.models/lead.entity';
import { DatabaseService } from './db.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
