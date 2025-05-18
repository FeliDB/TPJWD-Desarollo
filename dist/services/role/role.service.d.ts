import { Repository } from 'typeorm';
import { RoleEntity } from 'src/entities/roles.entity';
export declare class RoleService {
    private roleRepository;
    userRepository: any;
    constructor(roleRepository: Repository<RoleEntity>);
    createRole(body: any): Promise<RoleEntity[]>;
}
