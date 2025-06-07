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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../services/users/users.service");
const jwt_service_1 = require("../../jwt/jwt.service");
const permissions_decorator_1 = require("../../decorators/permissions.decorator");
const common_2 = require("@nestjs/common");
let UsersController = class UsersController {
    constructor(usersService, jwtservice) {
        this.usersService = usersService;
        this.jwtservice = jwtservice;
    }
    createUser(body) {
        return this.usersService.createUser(body);
    }
    assignToUser(id, body) {
        return this.usersService.assignToUser(id, body);
    }
    async loginUser(body) {
        const user = await this.usersService.loginUser(body);
        if (!user) {
            throw new common_2.UnauthorizedException('Credenciales inválidas');
        }
        const token = this.jwtservice.generateToken({ email: user.email }, 'auth');
        return { user, token };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, permissions_decorator_1.Permissions)('createUser'),
    (0, common_1.Post)('createUsers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('assignRole'),
    (0, common_1.Post)(':id/assignToUser'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "assignToUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_service_1.JwtService])
], UsersController);
//# sourceMappingURL=users.controller.js.map