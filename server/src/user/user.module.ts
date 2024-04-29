import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
      TypeOrmModule.forFeature([User]),
      RolesModule,
      forwardRef(()=>AuthModule)
  ],
  exports: [
      UserService
  ],
})
export class UserModule {}
