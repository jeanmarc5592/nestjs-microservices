import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { ClientGrpc } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import {
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common/types/notifications';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private notificationsService: NotificationsServiceClient;

  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_API_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationsService =
      this.client.getService<NotificationsServiceClient>(
        NOTIFICATIONS_SERVICE_NAME,
      );
  }

  async createCharge({ email, amount }: PaymentsCreateChargeDto) {
    const charge = await this.stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      source: 'tok_visa',
    });

    this.notificationsService
      .notifyEmail({
        email,
        text: `Your payment of $${amount} has been completed successfully!`,
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .subscribe(() => {});

    return charge;
  }
}
