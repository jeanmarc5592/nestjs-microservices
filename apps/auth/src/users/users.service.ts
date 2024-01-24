import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { CryptographyService } from '@app/common/cryptography/src/cryptography.service';
import { GetUserDto } from './dto/get-user.dto';
import { User } from '@app/common/entities/user.entity';
import { UserRole } from '@app/common/entities/user-role.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptographyService: CryptographyService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);

    const user = new User({
      ...createUserDto,
      password: await this.cryptographyService.hash(createUserDto.password),
      roles: createUserDto.roles?.map(
        (userRoleDto) => new UserRole(userRoleDto),
      ),
    });

    return this.usersRepository.create(user);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await this.cryptographyService.compareStrings(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne({ id: getUserDto.id }, { roles: true });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('Email already exists');
  }
}
