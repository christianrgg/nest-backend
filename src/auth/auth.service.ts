import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';

// 70. Instalar JWT npm install --save @nestjs/jwt
// 71. Inyectar e importar en constructor private jwtService: JwtService

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private jwtService: JwtService
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

  
  async login(loginDto:LoginDto){
 
    const {email, password} = loginDto;

     const user = await this.userModel.findOne({email});
 
      if(!user){
        throw new UnauthorizedException('Not valid credentials - email')
      }
      if(!bcryptjs.compareSync(password, user.password)){
        throw new UnauthorizedException('Not valid credentials - password')
      }
      
      const {password:_, ...rest}= user.toJSON();
      // 74. Llamar al metodo jwt 
      return {
        user: rest,
        token: this.getJwtToken({id:user.id}),
      }
  }
  // 75. En el .env generar una clave secreta para para el jwt JWT_SEED=

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
  
  // 72. Hacer metodo para JWT
  getJwtToken(payload:JwtPayload){
    //73. Crear la constante para generar token
    const token = this.jwtService.sign(payload);
    return token;
  }
}
