import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { RequestWithUser } from 'src/interfaces/request-user';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    me(req: RequestWithUser): {
        email: string;
    };
    login(body: LoginDTO): Promise<{
        user: import("../../entities/user.entity").UserEntity;
        accessToken: string;
        refreshToken: string;
    }>;
    register(body: RegisterDTO): Promise<{
        status: string;
    }>;
    canDo(request: RequestWithUser, permission: string): {
        user: import("../../entities/user.entity").UserEntity;
        permission: string;
    };
    refreshToken(request: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
