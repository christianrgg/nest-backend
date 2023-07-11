import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
// 90. Arreglar al importaciones al index
import { RegisterUserDto, LoginDto, UpdateAuthDto } from './dto/index';



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

  // 83. Crear el metodo register
  // 89. Agregar la propiedad y el tipo
  async register(registerDto: RegisterUserDto):Promise<LoginResponse> {
    // 91. Crear contante para usuario (Ahora acepta al registerdto porque son igual que el login o createdto, pero en caso de no aceptarlo hacer desestructuración) {email: registerDto.email} etc
    const user = await this.create(registerDto);
    console.log({user});
    // 93. Hacer el llamado del getjwt y agregar lo necesario para el registro
    return{
      user,
      token: this.getJwtToken({id: user._id})
    }
  }
  
  
  
  // 82. Agregar el tipo de dato que devolvera
  async login(loginDto:LoginDto):Promise<LoginResponse>{
 
    const {email, password} = loginDto;

     const user = await this.userModel.findOne({email});
 
      if(!user){
        throw new UnauthorizedException('Not valid credentials - email')
      }
      if(!bcryptjs.compareSync(password, user.password)){
        throw new UnauthorizedException('Not valid credentials - password')
      }
      
      const {password:_, ...rest}= user.toJSON();

      return {
        user: rest,
        token: this.getJwtToken({id:user.id}),
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
  
  getJwtToken(payload:JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }
}
