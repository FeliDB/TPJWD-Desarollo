import { PermissionsI } from '../interfaces/permissions.interface';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
export class PermissionEntity extends BaseEntity implements PermissionsI {
  @PrimaryGeneratedColumn()
  id: number;
  codigo: string;
  @Column()
  nombre: string;
}