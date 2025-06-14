"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_service_1 = require("../jwt/jwt.service");
const users_service_1 = require("../services/users/users.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, usersService, reflector) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        console.log("➡️ Entró al AuthGuard");
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            console.error("No se envió Authorization en headers");
            throw new common_1.UnauthorizedException('No se envió el token');
        }
        if (!authHeader.startsWith('Bearer ')) {
            console.error("Formato incorrecto del token");
            throw new common_1.UnauthorizedException('Formato de token inválido');
        }
        const token = authHeader.replace('Bearer ', '').trim();
        console.log("token recibido:", token);
        try {
            const payload = this.jwtService.getPayload(token);
            console.log("payload decodificado:", payload);
            const user = await this.usersService.findByEmail(payload.email);
            if (!user) {
                console.error("usuario no encontrado con email:", payload.email);
                throw new common_1.UnauthorizedException('Usuario no encontrado');
            }
            request.user = user;
            const permissions = this.reflector.get('permissions', context.getHandler());
            console.log('Permisos requeridos:', permissions);
            return true;
        }
        catch (error) {
            console.error("error en AuthGuard:", error.message);
            throw new common_1.UnauthorizedException('Token inválido o error de autenticación');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        users_service_1.UsersService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.middleware.js.map