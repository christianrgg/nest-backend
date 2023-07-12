import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {  
  // 111. inyectar el servicio en el constructor
  constructor(
    private jwtService: JwtService,
    private authService: AuthService
    ){}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // 104. Hacer condicional si no hay token
    if (!token) {
      throw new UnauthorizedException('There is no bearer token');
    }
    //105. Agregar async por el await, el tipo de verifyasync e importarlo y modificar el secret, meterlo en un trycatch por si hay error.
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token, {secret: process.env.JWT_SEED}
      );  
      // console.log({payload});

      // 112. Hacer consulta del usuario
      const user = await this.authService.findById(payload.id)
      // 113. Hacer las condicionales si no hay usuario y si esta activo (por posibles bloqueos)
      if(!user) throw new UnauthorizedException('User does not exist')
      if(!user.isActivate) throw new UnauthorizedException('User is not active')

      // request['user'] = payload.id;
      // 113. Si todo esta ok
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException()
    }

    // console.log({token});
    // 106. Como es un metodo asyncrono puede regresar un true
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}


