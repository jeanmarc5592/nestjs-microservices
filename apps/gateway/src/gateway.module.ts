import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@app/common/logger/logger.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerModule],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
