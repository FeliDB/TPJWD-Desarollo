import { PermissionsI } from '../interfaces/permissions.interface';
import { BaseEntity, Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './roles.entity';

@Entity('permission')
export class PermissionEntity extends BaseEntity implements PermissionsI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  codigo: string;

  @Column()
  nombre: string;

  @ManyToMany(() => RoleEntity, role => role.id)
  role: RoleEntity[];

}


   