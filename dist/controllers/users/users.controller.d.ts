import { UsersService } from 'src/services/users/users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(body: any): Promise<import("../../entities/user.entity").UserEntity[]>;
    assignToUser(id: number, body: {
        roleId: number;
    }): Promise<import("../../entities/user.entity").UserEntity>;
}
