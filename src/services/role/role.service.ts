import { Injectable } from '@nestjs/common';
import { RoleController } from 'src/controllers/role/role.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../entities/roles.entity';

@Injectable()
export class RoleService {
    userRepository: any;
    constructor (
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>
    ){ }

    //GET
    async getRole(){
        return this.roleRepository.find()
    }

    //POST
    async createRole(body: any){
        const role = this.roleRepository.create(body)
        return this.roleRepository.save(role)
    }

    async updateRole(body:any){}



}
