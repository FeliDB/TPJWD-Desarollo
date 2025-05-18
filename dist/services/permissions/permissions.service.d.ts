import { Repository } from 'typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
export declare class PermissionsService {
    private permissionRepository;
    constructor(permissionRepository: Repository<PermissionEntity>);
    createPermission(body: any): Promise<PermissionEntity[]>;
}
