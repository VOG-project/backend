import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    /*
      resave: 세션 수정 없어도 세션 다시 생성할 지
      saveUninitialized: 세션에 저장할 내용 없어도 처음부터 세션 생성할 지
      httpOnly: 클라이언트에서 쿠키 확인 가능 여부
      secure: true면 https에서만 사용 가능
    */
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );

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
