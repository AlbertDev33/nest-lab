import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';

const AUDIENCE = 'AUTH0_AUDIENCE';
const DOMAIN = 'AUTH0_DOMAIN';
const ALGORITHMS = 'RS256';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get(AUDIENCE) ?? '';
    this.AUTH0_DOMAIN = this.configService.get(DOMAIN) ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const httpContext = context.switchToHttp();
    // const request = httpContext.getRequest();
    // const response = httpContext.getResponse();

    const { req: request, res: response } =
      GqlExecutionContext.create(context).getContext();

    const checkJWT = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: [ALGORITHMS],
      }),
    );

    try {
      await checkJWT(request, response);
      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}