import { RoleService } from '../../services/role/role.service';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    getRole(): Promise<import("../../entities/roles.entity").RoleEntity[]>;
}
