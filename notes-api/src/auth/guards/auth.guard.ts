import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/** Claims carried by the access tokens this API issues. */
export interface JwtPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

/** An Express request once AuthGuard has attached the verified token payload. */
export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // No `secret` here on purpose. JwtService is configured once, by
      // JwtModule.registerAsync in AppModule; passing a second secret through
      // these options would take precedence over that config and let the two
      // silently drift apart.
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        algorithms: ['HS256'],
      });

      request.user = payload;
    } catch (error) {
      // The reason stays server-side: expired, malformed and wrongly-signed
      // tokens must be indistinguishable to the caller. Logging it means a
      // configuration problem cannot disguise itself as an ordinary 401.
      this.logger.warn(
        `Rejected token: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [scheme, token, ...rest] =
      request.headers.authorization?.split(' ') ?? [];

    // RFC 7235: the scheme is case-insensitive, and credentials are a single token.
    if (scheme?.toLowerCase() !== 'bearer' || !token || rest.length > 0) {
      return undefined;
    }

    return token;
  }
}
