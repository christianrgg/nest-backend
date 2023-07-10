// 12. Generar un recurso completo de autenticación con comando nest g resource auth
// 13. Seleccionar REST API
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
