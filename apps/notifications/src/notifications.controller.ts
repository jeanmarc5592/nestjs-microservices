import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotifyEmailDto } from './dto/notify-email.dto';
import {
  NotificationsServiceController,
  NotificationsServiceControllerMethods,
} from '@app/common/types/notifications';

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  async notifyEmail(data: NotifyEmailDto) {
    return this.notificationsService.notifyEmail(data);
  }
}
