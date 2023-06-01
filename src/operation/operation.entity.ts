import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: OperationType;

  @Column()
  cost: number;
}

export enum OperationType {
  addition,
  subtraction,
  multiplication,
  division,
  square_root,
  random_string,
}
