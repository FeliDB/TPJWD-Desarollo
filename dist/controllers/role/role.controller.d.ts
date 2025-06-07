import { RoleService } from 'src/services/role/role.service';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    postRole(body: any): Promise<import("../../entities/roles.entity").RoleEntity[]>;
    putRole(body: any): Promise<void>;
}
