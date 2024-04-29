import {Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {User} from "../user/user.entity";

@Entity('Roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value:string

    @Column()
    description: string;
}