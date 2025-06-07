import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersController } from 'src/controllers/users/users.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RoleEntity } from 'src/entities/roles.entity';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)   // <--- Falta esta línea
    private roleRepository: Repository<RoleEntity>
  ){}

  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }

  async createUser(body: any){
    const user = this.userRepository.create(body)
    return this.userRepository.save(user)
  }

  //ASSIGNTOUSER
  async assignToUser(id: number, body: { roleId: number }) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const role = await this.roleRepository.findOne({ where: { id: body.roleId } });
    if (!role) {
      throw new NotFoundException(`Role with id ${body.roleId} not found`);
    }

    user.role = role;
    return this.userRepository.save(user);
  }

  async loginUser(body: any): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (!user || user.password !== body.password) {
      throw new UnauthorizedException();
    }

    return user;
  }




}


