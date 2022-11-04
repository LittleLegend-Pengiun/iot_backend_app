import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpReq = context.switchToHttp().getRequest();
    const httpCookies = httpReq.cookies;
    // console.log(httpReq);
    if (httpCookies["jwt-token"]) {
      return this.usersService.jwtVerify(httpCookies["jwt-token"]);
    }
    return false;
  }
}
