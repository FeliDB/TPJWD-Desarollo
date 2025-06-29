import { LoginDTO } from '../../interfaces/login.dto';
import { UserI } from '../../interfaces/user.interface';
import { UserEntity } from '../../entities/user.entity';
import { JwtService } from '../../jwt/jwt.service';
import { RoleEntity } from '../../entities/roles.entity';
export declare class UsersService {
    private jwtService;
    repository: typeof UserEntity;
    roleRepository: typeof RoleEntity;
    constructor(jwtService: JwtService);
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    canDo(user: UserI, permission: string): boolean;
    register(body: any): Promise<{
        status: string;
    }>;
    login(body: LoginDTO): Promise<{
        user: UserEntity;
        accessToken: string;
        refreshToken: string;
    }>;
    enviarTokenAOtroBackend(accessToken: string, role: string): Promise<void>;
    findByEmail(email: string): Promise<UserEntity | null>;
    existsUsers(email: string): Promise<boolean>;
}
