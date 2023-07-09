// 1. Instalar globalmente la aplicación: npm i -g @nestjs/cli
// 2. Crear la aplicación nest: nest new nest-backend
// 3. Desinstalar con: npm uninstall prettier eslint-config-prettier eslint-plugin-prettier
// 4. Con el panel de control recargar la ventana
// 5. Ejecutar la aplicación npm run start:dev
// 6. Postman enviar un get send a la url http://localhost:3000/
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
