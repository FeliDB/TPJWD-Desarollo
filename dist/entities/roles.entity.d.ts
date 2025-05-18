import { RolesI } from '../interfaces/roles.interface';
import { BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class RoleEntity extends BaseEntity implements RolesI {
    id: number;
    nombre: string;
    codigo: string;
    user: UserEntity;
}
