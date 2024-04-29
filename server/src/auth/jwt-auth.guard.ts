import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const Bearer = authHeader.split(' ')[0];
            const Token = authHeader.split(' ')[1];
            if (Bearer !== 'Bearer' || !Token) {
                throw new UnauthorizedException({message: " User is Unauthorized"});
            }

            const user = this.jwtService.verify(Token);
            req.user = user;
            return true

        } catch (e) {
            throw new UnauthorizedException({message: " User is Unauthorized"});
        }
    }
}
