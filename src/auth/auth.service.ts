import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  // 43. Inyectar el UserModel en el servicio(ver en documentación cats.service). Hacer las importaciones y modificar los cats por User
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ){}
  
  // 44. Agregar Agregar los tipos de datos que debe regresar
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    // 45. Crear constante para crear usuario con una nueva instancia pasandole el createUserDto  
    // 46. Retornar y grabar
    // 47. Los dos pasos anteriores meterlos dentro de un try and catch asignar async a create y await al return
    // 48. Agregar al cath el error 11000 y los demas errores para errores controlados
    try {
      const newUser = new this.userModel(createUserDto);
      return await newUser.save(); 
    } catch (error) {
      if (error.code === 11000){
        throw new BadRequestException(`${createUserDto.email} already exist!`)
      }
      throw new InternalServerErrorException('Something terrible happen!!');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
