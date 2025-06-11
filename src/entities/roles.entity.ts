import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from './user.entity';

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
}
