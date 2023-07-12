import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


// 94. Generar el guards nest g gu <path/nombre>
@Injectable()
export class AuthGuard implements CanActivate {  
  // 96. Crear constructor y hacer la inyeccion de jwtservice (de la docuementacion)
  constructor(private jwtService: JwtService){ }
  
  
  // 95. Ver las tres formas en la que puede trabajar, boolean, promesa u observable, dejar solo boolean
  canActivate(context: ExecutionContext): Promise<boolean> {
    //97 crear la constante request
    const request = context.switchToHttp().getRequest();
    // console.log({request});
    // 101. Traer propiedad token de la documentación
    const token = this.extractTokenFromHeader(request);
    console.log({token});
    // 102. Obterner con post un token en url localhost:3000/auth/login con un usuario existente en la base de datos 
    // 103. Probar la autorización con postman en nueva ventana get, url:localhost:3000/auth, Authorization, tipo: Bearer Token y pegar el token

    // 98. Retornar la promesa con true
    return Promise.resolve(true);
  }

  // 100. Traer el metodo extraertoken de la documentación, autorización ponerla entre llaves y comillas simples y quitar el punto
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}


