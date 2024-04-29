import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/load')
export class LoadController {

    @UseGuards(JwtAuthGuard)
    @Get()
    getLoads(){

    }
}
