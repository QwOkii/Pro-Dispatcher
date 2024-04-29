import {IsString} from "class-validator";

export class CreateRoleDto {
    @IsString({message:"should be a string"})
    readonly value: string;
    @IsString({message:"should be a string"})
    readonly description: string;
}