import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './roles.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role: RoleEntity;  // <--- Aquí debe estar definido explícitamente
  // user: UserEntity[];


  get permissionCodes() {
    return ['create-users', 'list-products'];
  }
}
