// 20. Para las variables de entorno instalar npm i @nestjs/config
// 21. Agregar a los imports ConfigModule.forRoot()
// 22. Crear constructor e imprimir el proceso .env constructor(){ console.log(process.env);} ver en consola corriendo mongo_url
// 23. Cambiar la liga de conexion por el proceso .env . mongo
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule
  ],  
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
