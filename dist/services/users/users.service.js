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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jwt_service_1 = require("../../jwt/jwt.service");
const axios_1 = require("axios");
const roles_entity_1 = require("../../entities/roles.entity");
let UsersService = class UsersService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.repository = user_entity_1.UserEntity;
        this.roleRepository = roles_entity_1.RoleEntity;
    }
    async refreshToken(refreshToken) {
        return this.jwtService.refreshToken(refreshToken);
    }
    canDo(user, permission) {
        const result = user.permissionCodes.includes(permission);
        if (!result) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    async register(body) {
        try {
            const role = await this.roleRepository.findOne({
                where: { nombre: body.role },
                relations: ['permission'],
            });
            const user = new user_entity_1.UserEntity();
            user.email = body.email;
            user.password = (0, bcrypt_1.hashSync)(body.password, 10);
            user.role = role;
            await this.repository.save(user);
            return { status: 'created' };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Error de creación', 500);
        }
    }
    async login(body) {
        const user = await this.findByEmail(body.email);
        const role = user.role.nombre;
        if (user == null) {
            throw new common_1.UnauthorizedException();
        }
        const compareResult = (0, bcrypt_1.compareSync)(body.password, user.password);
        if (!compareResult) {
            throw new common_1.UnauthorizedException();
        }
        const accessToken = this.jwtService.generateToken({ email: user.email }, 'auth');
        const refreshToken = this.jwtService.generateToken({ email: user.email }, 'refresh');
        await this.enviarTokenAOtroBackend(accessToken, role);
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
    async enviarTokenAOtroBackend(accessToken, role) {
        console.log("accessToken", accessToken);
        console.log("role", role);
        try {
            const response = await axios_1.default.get('http://localhost:3001/delivery/findByProximity', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Permissions: role,
                },
            });
            console.log('Respuesta del otro backend:', response.data);
        }
        catch (error) {
            console.error('Error al comunicarse con el otro backend:', error.response?.data || error.message);
        }
    }
    async findByEmail(email) {
        return await this.repository.findOne({
            where: { email },
            relations: ['role'],
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map