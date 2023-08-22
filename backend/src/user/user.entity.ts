import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contract } from './contract.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mail: string;

  @Column()
  username: string;

  @Column()
  password: string;

	@Column()
  first_name: string;

	@Column()
  last_name: string;

	@Column()
	phone: string

	@OneToMany(() => Contract, contract => contract.user)
  contracts: Contract[];
}