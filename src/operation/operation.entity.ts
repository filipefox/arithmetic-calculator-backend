import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Operation {
  constructor(type: OperationType, cost: number) {
    this.type = type;
    this.cost = cost;
  }

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
