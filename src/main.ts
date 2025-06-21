import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;

  const logger = new Logger('bootstrap');

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //   whiteList: Remueve todo lo que no está incluido  en los DTOs.
      forbidNonWhitelisted: true, // forbidNonWhiteListed: Retorna bad request  si hay propiedades en el objeto no requeridas.
    }),
  );

  await app.listen(PORT);

  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
