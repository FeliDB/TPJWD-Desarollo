import { RolesI } from '../interfaces/roles.interface';
import { BaseEntity, Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity implements RolesI {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  codigo: string;

  @OneToOne(() => UserEntity, user => user.role)
  user: UserEntity;
}

