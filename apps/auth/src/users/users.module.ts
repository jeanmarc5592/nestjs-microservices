import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '@app/common/database/database.module';
import { UserDocument, UserSchema } from '../../../../libs/common/src/models/user.schema';
import { LoggerModule } from '@app/common/logger/logger.module';
import { CryptographyService } from '@app/common/cryptography/src/cryptography.service';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CryptographyService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
