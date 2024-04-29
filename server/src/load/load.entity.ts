import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('load')
export class Load {
    @PrimaryGeneratedColumn()
    id: number;


}