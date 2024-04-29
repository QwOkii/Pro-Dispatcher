import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @IsString({message:"should be a string"})
    readonly name: string;
    @IsString({message:"should be a string"})
    @IsEmail({},{message:"should be a valid email"})
    readonly email: string;
    @IsString({message:"should be a string"})
    @Length(5,16,{message:"the password must contain at least 5 characters and no more than 16 characters"})
    readonly password: string;

}