import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  constructor(type: UserType, cost: number) {
    this.type = type;
    this.cost = cost;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: UserType;

  @Column()
  cost: number;
}

export enum UserType {
  addition,
  subtraction,
  multiplication,
  division,
  square_root,
  random_string,
}
