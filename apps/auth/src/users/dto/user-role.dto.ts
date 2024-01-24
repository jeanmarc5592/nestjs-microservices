import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserRoleDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
