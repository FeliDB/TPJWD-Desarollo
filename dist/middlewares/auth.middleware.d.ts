import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '../jwt/jwt.service';
import { UsersService } from '../services/users/users.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private usersService;
    private reflector;
    constructor(jwtService: JwtService, usersService: UsersService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
