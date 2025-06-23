import { PermissionsService } from '../../services/permissions/permissions.service';
export declare class PermissionsController {
    private permissionsService;
    constructor(permissionsService: PermissionsService);
    createPermission(body: any): Promise<import("../../entities/permission.entity").PermissionEntity[]>;
}
