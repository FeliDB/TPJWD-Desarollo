import { RoleI } from '../interfaces/permission.interface';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})
  @Column()
  email: string;
  @Column()
  password: string;

  get permissionCodes() {
    return ['create-users', 'list-products'];
  }
}
