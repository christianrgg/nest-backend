import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ){}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    try {
      const {password, ...userData} = createUserDto;
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password,10),
        ...userData
      });

      await newUser.save(); 
      const {password:_, ...user} = newUser.toJSON();
      return user
    } catch (error) {
      if (error.code === 11000){
        throw new BadRequestException(`${createUserDto.email} already exist!`)
      }
      throw new InternalServerErrorException('Something terrible happen!!');
    }
  }

  // 58. Crear el servicio para login que reciba un loginDto de tipo LoginDto
  async login(loginDto:LoginDto){
    //64. Mostrar en consola el loginDto console.log({loginDto});
    // 65. Desestructurar logindtp
    const {email, password} = loginDto;

    // 66. Verificar si el email del usuario existe en la base de datos
     const user = await this.userModel.findOne({email});
    // 67. Agregar condicional si el usuario no existe o la contraseña no es correcta
      if(!user){
        throw new UnauthorizedException('Not valid credentials - email')
      }
      if(!bcryptjs.compareSync(password, user.password)){
        throw new UnauthorizedException('Not valid credentials - password')
      }
      
      // 68. Crear propiedad para desestructurar el json y olvidar el password
      const {password:_, ...rest}= user.toJSON();
      //69 returnar el rest en un user y un token pendiente de creación
      return {
        user: rest,
        token: 'ABC-123'
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
