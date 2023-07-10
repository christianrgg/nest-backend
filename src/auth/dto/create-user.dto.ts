// 34. Renombrar archivo por el actual y la clase
// 35. Analizar el archivo user.entity.ts y tomar lo que el usuario necesite para crear su usuario por ejemplo "El mismo no se puede asignar roles"
// 39. Instalar librerias externas npm i class-validator class-transformer
// 41. Agregar decoradores de decoradores de Class Validator
// 42. Probar en postman con peticion post a la url http://localhost:3000/auth tipo body x-www-form-urlencode, escribir las claves y los valores con erroes y correctos y send para probar.

import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    nombre: string;

    @MinLength(8)
    password: string
}
