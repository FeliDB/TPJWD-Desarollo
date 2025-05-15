import { RolesI } from '../interfaces/roles.interface';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class UserEntity extends BaseEntity implements RolesI {
  @Column()
  nombre: string;
  @Column()
  codigo: string;

  
}

