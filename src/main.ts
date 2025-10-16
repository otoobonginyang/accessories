import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? process.env.APP_PORT;

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  // if (port === undefined) {
  //   throw new Error('PORT is not defined in config or environment variables');
  // }



  await app.listen(process.env.PORT ?? 4000);
  console.log('App running on port 4000');
}
bootstrap();
