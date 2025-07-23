import { Repository } from 'typeorm';
import { RoleEntity } from '../../entities/roles.entity';
export declare class RoleService {
    private roleRepository;
    userRepository: any;
    constructor(roleRepository: Repository<RoleEntity>);
    getRole(): Promise<RoleEntity[]>;
    createRole(body: any): Promise<RoleEntity[]>;
    updateRole(body: any): Promise<void>;
}
