import { RoleService } from '../../services/role/role.service';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    getRole(): Promise<import("../../entities/roles.entity").RoleEntity[]>;
    postRole(body: any): Promise<import("../../entities/roles.entity").RoleEntity[]>;
    putRole(body: any): Promise<void>;
}
