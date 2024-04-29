import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Auth} from "./auth.entity";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    TypeOrmModule.forFeature([Auth]),
    forwardRef(() => UserModule),
    JwtModule.register({secret:'SECRET',signOptions:{expiresIn:'1d'}}),
  ],
  exports: [
      AuthService,
      JwtModule
  ],
})
export class AuthModule {}
