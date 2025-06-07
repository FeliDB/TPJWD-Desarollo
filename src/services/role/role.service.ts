import { Injectable } from '@nestjs/common';
import { RoleController } from 'src/controllers/role/role.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/entities/roles.entity';

@Injectable()
export class RoleService {
    userRepository: any;
    constructor (
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>
    ){ }

    //POST
    async createRole(body: any){
        const role = this.roleRepository.create(body)
        return this.roleRepository.save(role)
    }

    async updateRole(body:any){}



}
