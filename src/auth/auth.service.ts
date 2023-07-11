import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs'
// 49. Instalar npm i bcryptjs
// 50 Importar todo como bcryptjs de bcryptjs
// 51. Hacer la instalación con referencia a typescript npm i --save-dev @types/bcryptjs

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ){}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    try {
      // 52. Crear una constante en la que se desestructure el usuario, se obtenga su password y el resto lo almacene un variable userDta
      const {password, ...userData} = createUserDto;
      //53. Crear una instancia del modelo usuario, encriptar con bcryptjs la contraseña con 10 rondas hash y copiar las propiedades restantes del user data.
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password,10),
        ...userData
      });

      // 54. El user que se devuelve en postman y mongo, primero quitar el returny dejar la espera de usuario.
      await newUser.save(); 
      //55. Desestructurar el newUser por el password e  indicar que el valor no se utilizará más adelante y el resto de las propiedades creando una nueva instancia y pasandola a JSON.
      const {password:_, ...user} = newUser.toJSON();
      // 56. retornar el usuario sin el password
      return user
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
