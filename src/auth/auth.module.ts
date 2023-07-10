import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
// 32. Importar el modulo de mongoose y agregar modelos permitidos
// 33. Ir a mongoo y refrescar con ctrl + r y ver la base de datos
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ]
})
export class AuthModule {}
