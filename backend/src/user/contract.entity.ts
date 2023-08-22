import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  species: string;

  @Column()
  gender: string;

  @Column()
  origin: string;

  @Column()
  location: string;

  @ManyToOne(() => User, user => user.contracts)
  user: User;
}
