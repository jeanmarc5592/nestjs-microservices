import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
