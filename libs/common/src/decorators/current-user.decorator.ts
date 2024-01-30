import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '@app/common/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }

  // For Graphql requests
  const user = context.getArgs()[2]?.req.headers?.user;

  if (user) {
    return JSON.parse(user);
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
