import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../roles/roles.entity";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable:true})
    Tariff: string;

    @Column({type:'date',nullable:true})
    last_payment:Date

    @Column({type:'date',nullable:true})
    next_payment:Date

    @ManyToMany( ()=>Role)
    @JoinTable()
    Roles:Role[];
}