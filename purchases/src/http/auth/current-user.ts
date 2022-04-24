import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  req: {
    user: {
      sub: string;
    };
  };
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthUser => {
    const req = GqlExecutionContext.create(context).getContext<AuthUser>();
    return req;
  },
) as any;
