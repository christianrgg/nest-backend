import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
// 87. Cambiar las importaciones hacia el index
import { CreateUserDto, LoginDto, RegisterUserDto, UpdateAuthDto} from './dto/index';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }
  // 84. Crear el metodo para el register
  // 88. Hacer las adecuaciones para el dto creado para este metodo
  @Post('/register')
  register(@Body() registerDto: RegisterUserDto){
    return this.authService.register(registerDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
