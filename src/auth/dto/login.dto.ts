import { IsEmail, MinLength } from 'class-validator';
// 59. Crear el archivo dto para hacer la validación de usuario y contraseña.
// 60. Crear la clase con los requerimientos y agregar decoradores 
export class LoginDto{
    @IsEmail()
    email: string

    @MinLength(8)
    password: string
}