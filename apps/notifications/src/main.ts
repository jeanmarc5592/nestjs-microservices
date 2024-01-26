import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'notifications',
    },
  });

  app.useLogger(app.get(Logger));

  app.startAllMicroservices();
}

bootstrap();
