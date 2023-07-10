import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// 38. Actualizar las importaciones y los nombres de las propiedades y clases aqui igual
export class UpdateAuthDto extends PartialType(CreateUserDto) {}
