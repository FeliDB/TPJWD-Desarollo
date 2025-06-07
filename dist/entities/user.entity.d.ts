import { UserI } from '../interfaces/user.interface';
import { BaseEntity } from 'typeorm';
import { RoleEntity } from './roles.entity';
export declare class UserEntity extends BaseEntity implements UserI {
    id: number;
    email: string;
    password: string;
    role: RoleEntity;
    get permissionCodes(): string[];
}
