import { PermissionsI } from '../interfaces/permissions.interface';
import { BaseEntity } from 'typeorm';
import { RoleEntity } from './roles.entity';
export declare class PermissionEntity extends BaseEntity implements PermissionsI {
    id: number;
    codigo: string;
    nombre: string;
    role: RoleEntity[];
}
