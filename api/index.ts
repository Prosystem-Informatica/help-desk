import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import express, { Express, Request, Response } from 'express';

let cachedApp: Express;

async function bootstrap(): Promise<Express> {
  if (!cachedApp) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.enableCors({
      origin: true,
      credentials: true,
    });

    await app.init();

    cachedApp = expressApp;
  }
  return cachedApp;
}

export default async (req: Request, res: Response) => {
  const app = await bootstrap();
  return app(req, res);
};