import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '@app/common/database/database.module';
import { User } from '@app/common/entities/user.entity';
import { LoggerModule } from '@app/common/logger/logger.module';
import { CryptographyService } from '@app/common/cryptography/src/cryptography.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { UserRole } from '@app/common/entities/user-role.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([User, UserRole]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CryptographyService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
