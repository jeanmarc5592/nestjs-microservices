import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { setApp } from './app';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  setApp(app);

  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
