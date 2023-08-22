import { Request } from 'express';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';



export class CreateUserDto{
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	first_name: string;

	@IsNotEmpty()
	last_name: string;

	@IsNotEmpty()
	@IsEmail()
	mail: string;

	@IsNotEmpty()
	@Length(6, 16)
	pwd: string;

	@IsNotEmpty()
	phone: string;
}

export class CreateContractDto{

	@IsNotEmpty()
	name:string;

	@IsNotEmpty()
	image:string;

	@IsNotEmpty()
	species: string;

	@IsNotEmpty()
	gender: string;

	@IsNotEmpty()
	origin: string;

	@IsNotEmpty()
	location: string;
}

export interface tokenRequest extends Request {
  user: any; 
}