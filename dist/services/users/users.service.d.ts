import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RoleEntity } from 'src/entities/roles.entity';
export declare class UsersService {
    private userRepository;
    private roleRepository;
    constructor(userRepository: Repository<UserEntity>, roleRepository: Repository<RoleEntity>);
    findByEmail(email: string): void;
    createUser(body: any): Promise<UserEntity[]>;
    assignToUser(id: number, body: {
        roleId: number;
    }): Promise<UserEntity>;
    loginUser(body: any): Promise<UserEntity>;
}
