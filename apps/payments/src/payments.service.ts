import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_API_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
