import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/images', express.static('./images'));
  global.appRoot = path.resolve(__dirname, '../src');
  await app.listen(3000);
}
bootstrap();
