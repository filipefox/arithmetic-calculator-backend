import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  status: UserStatus;

  constructor(id: number) {
    this.id = id;
  }
}

export enum UserStatus {
  active,
  inactive,
}
