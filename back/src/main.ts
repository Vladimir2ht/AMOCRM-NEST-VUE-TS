import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port: number = app.get(ConfigService).get('port');
  await app.listen(port);
  console.log('Started at port: ' + await app.getUrl())
}
bootstrap();
