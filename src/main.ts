import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.enableCors({
    origin: [
      process.env.FRONT_END_SERVER_URL_1,
      process.env.FRONT_END_SERVER_URL_2,
      'http://localhost:3002',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  const config = new DocumentBuilder()
    .setTitle('VOG API DOCS')
    .setDescription('VOG API DOCUMENTATIONS')
    .setVersion('1.0.0')
    .addTag('VOG')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
