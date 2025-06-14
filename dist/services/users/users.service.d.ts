import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from 'src/entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { RoleEntity } from 'src/entities/roles.entity';
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
    register(body: RegisterDTO): Promise<{
        status: string;
    }>;
    login(body: LoginDTO): Promise<{
        user: UserEntity;
        accessToken: string;
        refreshToken: string;
    }>;
    enviarTokenAOtroBackend(accessToken: string, role: string): Promise<void>;
    findByEmail(email: string): Promise<UserEntity | null>;
}
