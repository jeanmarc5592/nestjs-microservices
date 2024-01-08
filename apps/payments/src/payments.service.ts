import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_API_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ amount }: CreateChargeDto) {
    return await this.stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      source: 'tok_visa',
    });
  }
}
