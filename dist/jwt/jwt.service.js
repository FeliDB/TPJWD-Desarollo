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
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const dayjs = require("dayjs");
const config_1 = require("@nestjs/config");
let JwtService = class JwtService {
    constructor(configService) {
        this.configService = configService;
    }
    generateToken(payload, type = 'auth') {
        const secret = this.configService.get(type === 'auth' ? 'JWT_SECRET_AUTH' : 'JWT_SECRET_REFRESH') ?? 'defaultSecret';
        const expiresIn = this.configService.get(type === 'auth' ? 'JWT_EXPIRES_IN_AUTH' : 'JWT_EXPIRES_IN_REFRESH') ?? '15m';
        return (0, jsonwebtoken_1.sign)(payload, secret);
    }
    refreshToken(refreshToken) {
        try {
            const payload = this.getPayload(refreshToken, 'refresh');
            const timeToExpire = dayjs.unix(payload.exp).diff(dayjs(), 'minute');
            return {
                accessToken: this.generateToken({ email: payload.email }),
                refreshToken: timeToExpire < 20
                    ? this.generateToken({ email: payload.email }, 'refresh')
                    : refreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    getPayload(token, type = 'auth') {
        const secret = this.configService.get(type === 'auth' ? 'JWT_SECRET_AUTH' : 'JWT_SECRET_REFRESH');
        const decoded = (0, jsonwebtoken_1.verify)(token, secret);
        if (typeof decoded === 'string') {
            throw new common_1.UnauthorizedException('Token inválido');
        }
        return decoded;
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtService);
//# sourceMappingURL=jwt.service.js.map