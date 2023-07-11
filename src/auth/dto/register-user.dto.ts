import { IsEmail, IsString } from "class-validator";

// 85. Crear el register-user dto
export class RegisterUserDto{

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password:string;

}