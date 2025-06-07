import { UsersService } from 'src/services/users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
export declare class UsersController {
    private usersService;
    private jwtservice;
    constructor(usersService: UsersService, jwtservice: JwtService);
    createUser(body: any): Promise<import("../../entities/user.entity").UserEntity[]>;
    assignToUser(id: number, body: {
        roleId: number;
    }): Promise<import("../../entities/user.entity").UserEntity>;
    loginUser(body: any): Promise<{
        user: import("../../entities/user.entity").UserEntity;
        token: string;
    }>;
}
