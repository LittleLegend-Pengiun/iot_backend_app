import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors(
    { 
      origin: ['http://localhost:3000'],
      methods: ['POST', 'PUT', 'DELETE', 'GET']
    }
  );
  await app.listen(3000);
}
bootstrap();
