import { ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard, JwtPayload } from './auth.guard.js';

describe('AuthGuard', () => {
  const payload: JwtPayload = {
    sub: 4,
    email: 'halima@gmail.com',
    iat: 1_790_405_633,
    exp: 1_790_405_693,
  };

  let guard: AuthGuard;
  let verifyAsync: ReturnType<typeof vi.fn>;
  let request: { headers: { authorization?: string }; user?: JwtPayload };
  let context: ExecutionContext;

  beforeEach(() => {
    // Keep the expected "rejected token" warnings out of the test output.
    vi.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);

    verifyAsync = vi.fn();
    guard = new AuthGuard({ verifyAsync } as unknown as JwtService);
    request = { headers: {} };
    context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('accepts a valid bearer token and attaches the payload', async () => {
    verifyAsync.mockResolvedValue(payload);
    request.headers.authorization = 'Bearer valid.token.here';

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(request.user).toEqual(payload);
  });

  it('rejects a missing Authorization header without calling verify', async () => {
    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(verifyAsync).not.toHaveBeenCalled();
  });

  it('rejects a token that fails verification', async () => {
    verifyAsync.mockRejectedValue(new Error('jwt expired'));
    request.headers.authorization = 'Bearer expired.token.here';

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(request.user).toBeUndefined();
  });

  it('ignores a non-bearer scheme', async () => {
    request.headers.authorization = 'Basic valid.token.here';

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(verifyAsync).not.toHaveBeenCalled();
  });

  it('accepts a lower-case scheme (RFC 7235)', async () => {
    verifyAsync.mockResolvedValue(payload);
    request.headers.authorization = 'bearer valid.token.here';

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(request.user).toEqual(payload);
  });

  it('rejects a header carrying trailing segments', async () => {
    request.headers.authorization = 'Bearer valid.token.here junk';

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(verifyAsync).not.toHaveBeenCalled();
  });

  it('rejects an empty Authorization header', async () => {
    request.headers.authorization = '';

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(verifyAsync).not.toHaveBeenCalled();
  });
});
