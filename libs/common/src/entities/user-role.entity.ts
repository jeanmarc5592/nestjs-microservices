import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../database/abstract.entity';

@Entity()
export class UserRole extends AbstractEntity<UserRole> {
  @Column()
  name: string;
}
