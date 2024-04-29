import { Injectable } from '@nestjs/common';
import {Role} from "./roles.entity";
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        await this.roleRepository.save(role);
        return role;
    }
    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: { value } });
        return role;
    }
}
