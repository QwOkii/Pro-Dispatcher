import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {Repository} from "typeorm";
import {RolesService} from "../roles/roles.service";
import {InjectRepository} from "@nestjs/typeorm";
import {AddRole} from "./dto/add-role.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private roleService: RolesService) {}
    async createUser(CreateUserDto: CreateUserDto) {

        const user = await this.userRepository.create(CreateUserDto);
        await this.userRepository.save(user);
        const role = await this.roleService.getRoleByValue("User")

        user.Roles = [role]

        await this.userRepository.save(user);
        return user;
    }
    async GetUserByEmail(email: string): Promise<User> {
        const user=  await this.userRepository.findOne({ where: {email} });
        return user;
    }
    async GetAllUsers(): Promise<User[]> {
        return await this.userRepository.find({relations: ['Roles'],})
    }
    async AddRole(dto:AddRole ){
        const user = await this.userRepository.findOne({where: {id:dto.userId}});
        const role = await this.roleService.getRoleByValue(dto.value)
        if (user && role){
            user.Roles.push(role);
            return dto
        }
        throw new HttpException('User or role not found',HttpStatus.NOT_FOUND);
    }
}
