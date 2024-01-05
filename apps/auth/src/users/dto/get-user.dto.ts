import { IsString, IsNotEmpty } from 'class-validator';
export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
