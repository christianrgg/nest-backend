// CONFIURACIÓN MONGO DB
// 7. Instalar docker y hacer ajustes en bios
// 8. Ver las imagenes de mongo docker a usar en la siguiente liga https://hub.docker.com/_/mongo
// 9. Crear un archivo en la raiz de esta carpeta docker-compose.yml y colocar lo requerido
// 10. Ejecutar en la terminal el siguiente comando docker compose up -d y esto montara la imagen en el contenedor
// 11. Agregar al git ignore mongo/

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
