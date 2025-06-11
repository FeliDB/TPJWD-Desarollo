import { BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class RoleEntity extends BaseEntity {
    id: number;
    nombre: string;
    codigo: string;
    users: UserEntity[];
}
