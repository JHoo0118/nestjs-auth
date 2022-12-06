import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // isPublic이라는 값을 handler와 class에서 찾는다.
    // 즉, logout, signinLocal과 같은 handler에 isPublic이라는 값이 있는지 찾고
    // 다음으로 AuthController라는 class에서 isPublic이 있는지 찾는다.
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    // isPublic이라는 값을 찾으면 true 반환
    if (isPublic) return true;

    return super.canActivate(context);
  }
}
