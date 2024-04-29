import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcryptjs from 'bcryptjs'
import {User} from "../user/user.entity";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,private jwtService:JwtService) {}

    async login(createUserDto: CreateUserDto) {
        const user = await this.validateUser(createUserDto);
        return this.generateToken(user)
    }
    async signup(createUserDto: CreateUserDto) {
        const candidate = await this.userService.GetUserByEmail(createUserDto.email);
        if (candidate) {
            throw new HttpException("User with this email already registered", HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcryptjs.hash(createUserDto.password, 12);
        const user = await this.userService.createUser({...createUserDto, password: hashPassword});

        return this.generateToken(user)
        // на Front end потрібно буде вказати в header autorization = "Bearer + Token"
    }
    async generateToken(user: User){
        const payload  = {email: user.email,id:user.id, Roles:user.Roles};
        return {
            token: this.jwtService.sign(payload)
        }

    }

    async validateUser(userDto: CreateUserDto){
        const user = await this.userService.GetUserByEmail(userDto.email);
        const passwordEquals = await bcryptjs.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message:'Invalid email or password'});
    }
}
