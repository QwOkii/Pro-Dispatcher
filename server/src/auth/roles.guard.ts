import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {Roles_Key} from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector: Reflector) {}
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const RequaredRoles = this.reflector.getAllAndOverride<string[]>(Roles_Key,[
          context.getHandler(),
          context.getClass()
      ])
      if (!RequaredRoles){
        return true
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const Bearer = authHeader.split(' ')[0];
      const Token = authHeader.split(' ')[1];
      if (Bearer !== 'Bearer' || !Token) {
        throw new UnauthorizedException({message: " User is Unauthorized"});
      }

      const user = this.jwtService.verify(Token);
      req.user = user;
      return user.Roles.some((role) => RequaredRoles.includes(role.value));

    } catch (e) {
        throw new HttpException("No access",HttpStatus.FORBIDDEN)
    }
  }
}
