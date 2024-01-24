import { AbstractEntity } from '@app/common/database/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => UserRole, { cascade: true })
  @JoinTable()
  roles?: UserRole[];
}
