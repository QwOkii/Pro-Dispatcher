import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from "./user.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AddRole} from "./dto/add-role.dto";

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) {}


    @UsePipes(ValidationPipe)
    @Get()
    GetAll(){
        return this.userService.GetAllUsers()
    }
    @UsePipes(ValidationPipe)
    @Post('/role')
    addRole(@Body() dto: AddRole) {
        return this.userService.AddRole(dto)
    }

}
