import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PermissionEntity } from './permission.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @OneToMany(() => UserEntity, user => user.role)
  users: UserEntity[];

  @ManyToMany(() => PermissionEntity, permission => permission.id)
  @JoinTable()
  permission: PermissionEntity[];

}
