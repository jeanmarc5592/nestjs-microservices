import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  // Properties from extending entities will be popuplated
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
