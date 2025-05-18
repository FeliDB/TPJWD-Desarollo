import { PermissionsI } from '../interfaces/permissions.interface';
import { BaseEntity } from 'typeorm';
export declare class PermissionEntity extends BaseEntity implements PermissionsI {
    id: number;
    codigo: string;
    nombre: string;
}
