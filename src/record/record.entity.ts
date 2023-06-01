import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Record {
  constructor(type: RecordType, cost: number) {
    this.type = type;
    this.cost = cost;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: RecordType;

  @Column()
  cost: number;
}

export enum RecordType {
  addition,
  subtraction,
  multiplication,
  division,
  square_root,
  random_string,
}
