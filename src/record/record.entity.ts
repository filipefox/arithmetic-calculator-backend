import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operation } from '../operation/operation.entity';
import { User } from '../user/user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Operation)
  operation: Operation;
  @ManyToOne(() => User)
  user: User;
  @Column()
  costInCredits: number;
  @Column()
  request: string;
  @Column()
  response: string;
  @Column()
  dateTime: Date = new Date();
  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(
    operation: Operation,
    costInCredits: number,
    request: string,
    response: string,
  ) {
    this.operation = operation;
    this.costInCredits = costInCredits;
    this.request = request;
    this.response = response;
  }
}
