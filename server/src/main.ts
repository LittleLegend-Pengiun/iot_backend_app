import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

console.log(process.env.DB_HOST);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3030');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  app.use(cookieParser());
  app.enableCors(
    {
      origin: ['http://localhost:3000'],
      methods: ['POST', 'PUT', 'DELETE', 'GET'],
      credentials: true
    }
  );
  await app.listen(3030);
}
bootstrap();
