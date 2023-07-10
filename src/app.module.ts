// 12. Ver documentación en https://docs.nestjs.com/techniques/mongodb
// 13. Instalar las dependencias npm i @nestjs/mongoose mongoose
// 14. Agregar en este archivo MongooseModule.forRoot('mongodb://localhost/nest') en los imports
// 15. Cambiar el numero del puerto
// 16. Crear archivo .env y agregar la url de mongo
// 17. Agregar la terminación del archivo .env al gitignore
// 18. Crear otro archivo .env.template
// 19. El readme borrarlo y dejar las instrucciones para levantar app
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017')],
  controllers: [],
  providers: [],
})
export class AppModule {}
