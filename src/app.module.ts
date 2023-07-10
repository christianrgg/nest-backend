// 24. En el archivo .env agregar con una diagonal el nombre de la base de datos de mongo /mean-db
// 25. Bajar la aplicación y volverla a subir con npm run start:dev
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
