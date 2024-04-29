import { Module } from '@nestjs/common';
import { LoadController } from './load.controller';
import { LoadService } from './load.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Load} from "./load.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [LoadController],
  providers: [LoadService],
  imports:[
    TypeOrmModule.forFeature([Load]),
    AuthModule
  ]
})
export class LoadModule {}
