import { Injectable } from '@nestjs/common';
import { PermissionsController } from 'src/controllers/permissions/permissions.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../../entities/permission.entity';

@Injectable()
export class PermissionsService {
    constructor (
        @InjectRepository(PermissionEntity)
        private permissionRepository: Repository<PermissionEntity>
    ){ }

    async createPermission(body: any){
        const permission = this.permissionRepository.create(body)
        return this.permissionRepository.save(permission)
    }
}
