import { RoleI } from '../interfaces/role.interface';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity extends BaseEntity implements RoleI {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})
  @Column()
  description: string;
}
