import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { UserRoleDto } from './user-role.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UserRoleDto)
  roles?: UserRoleDto[];
}
