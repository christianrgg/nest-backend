import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, RegisterUserDto, UpdateAuthDto} from './dto/index';
import { AuthGuard } from './guards/auth.guard';


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

  @Post('/register')
  register(@Body() registerDto: RegisterUserDto){
    return this.authService.register(registerDto);
  }

// 107. Obtener el id de este lado
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req:Request) {
    // 108. console.log(req); en consola ver la request y encontrar el id
    // 109. Despues de analizar meter el id en una constante y retornar el id del usuario.
    const user = req['user'];
    return user
    // return this.authService.findAll();
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
