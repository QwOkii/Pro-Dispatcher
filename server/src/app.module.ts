import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LoadModule } from './load/load.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { UserModule } from './user/user.module';
import {Load} from "./load/load.entity";
import {Auth} from "./auth/auth.entity";
import {User} from "./user/user.entity";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'Admin',
    password: '12345',
    database: 'Load',
    entities: [Load,Auth,User,Role],
    synchronize: true,
  }) ,AuthModule, LoadModule, UserModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
