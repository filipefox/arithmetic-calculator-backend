import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Operation } from '../operation/operation.entity';
import { User } from '../user/user.entity';

@Entity()
export class Record {
  constructor(
    operation: Operation,
    user: User,
    costInCredits: number,
    request: string,
    response: string,
  ) {
    this.operation = operation;
    this.user = user;
    this.costInCredits = costInCredits;
    this.request = request;
    this.response = response;
  }

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
}
