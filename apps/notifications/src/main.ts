import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { NOTIFICATIONS_PACKAGE_NAME } from '@app/common/types/notifications';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: NOTIFICATIONS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/notifications.proto'),
      url: configService.getOrThrow('NOTIFICATIONS_GRPC_URL'),
    },
  });

  app.useLogger(app.get(Logger));

  app.startAllMicroservices();
}

bootstrap();
