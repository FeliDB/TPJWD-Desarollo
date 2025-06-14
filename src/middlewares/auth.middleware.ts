import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserEntity } from 'src/entities/user.entity';
import { RequestWithUser } from 'src/interfaces/request-user';
import { JwtService } from 'src/jwt/jwt.service';
import { Permissions } from './decorators/permissions.decorator';
import { UsersService } from 'src/services/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector:Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log("➡️ Entró al AuthGuard");

    const request: RequestWithUser = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      console.error("No se envió Authorization en headers");
      throw new UnauthorizedException('No se envió el token');
    }

    if (!authHeader.startsWith('Bearer ')) {
      console.error("Formato incorrecto del token");
      throw new UnauthorizedException('Formato de token inválido');
    }

    const token = authHeader.replace('Bearer ', '').trim();
    // console.log("token recibido:", token);

    try {
      const payload = this.jwtService.getPayload(token);
      // console.log("payload decodificado:", payload);

      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        console.error("usuario no encontrado con email:", payload.email);
        throw new UnauthorizedException('Usuario no encontrado');
      }

      request.user = user;

      const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
      // console.log('Permisos requeridos:', permissions);


      return true;
    } catch (error) {
      console.error("error en AuthGuard:", error.message);
      throw new UnauthorizedException('Token inválido o error de autenticación');
    }
  }

}
