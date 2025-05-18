"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const jwt_service_1 = require("./jwt/jwt.service");
const role_service_1 = require("./services/role/role.service");
const role_controller_1 = require("./controllers/role/role.controller");
const users_controller_1 = require("./controllers/users/users.controller");
const users_service_1 = require("./services/users/users.service");
const permissions_controller_1 = require("./controllers/permissions/permissions.controller");
const permissions_service_1 = require("./services/permissions/permissions.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                database: 'usuariosdb',
                username: 'felipe',
                password: '12345',
                synchronize: true,
                entities: entities_1.entities,
                port: 5439,
                host: 'localhost',
            }),
            typeorm_1.TypeOrmModule.forFeature(entities_1.entities)
        ],
        controllers: [app_controller_1.AppController, role_controller_1.RoleController, users_controller_1.UsersController, permissions_controller_1.PermissionsController],
        providers: [auth_middleware_1.AuthGuard, jwt_service_1.JwtService, role_service_1.RoleService, users_service_1.UsersService, permissions_service_1.PermissionsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map