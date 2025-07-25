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
exports.PermissionEntity = void 0;
const typeorm_1 = require("typeorm");
const roles_entity_1 = require("./roles.entity");
let PermissionEntity = class PermissionEntity extends typeorm_1.BaseEntity {
};
exports.PermissionEntity = PermissionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PermissionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PermissionEntity.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PermissionEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => roles_entity_1.RoleEntity, role => role.id),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], PermissionEntity.prototype, "role", void 0);
exports.PermissionEntity = PermissionEntity = __decorate([
    (0, typeorm_1.Entity)('permission')
], PermissionEntity);
//# sourceMappingURL=permission.entity.js.map