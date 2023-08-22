import { Injectable, BadRequestException,NotFoundException,ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Contract } from '../user/contract.entity';
import { CreateContractDto, CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    // private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>
  ) {}

		async getData(user_id : number){
			try{
			const user = await this.userRepository.findOne({ where: { id :user_id } });
			const userDto : CreateUserDto = {
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
				mail: user.mail,
				pwd: "",
				phone: user.phone,
			}
			return userDto;
			}
			catch (err){
				throw new Error(`${err.message}`);
			}
		}

		async updateMail(user_id: number, new_mail: string){
			try {
				const check_mail =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(new_mail);
				if (!check_mail){
					throw new BadRequestException('Invalid email format');
				}
				const user = await this.userRepository.findOne({ where: { id :user_id } });
				if (user){
					user.mail = new_mail;
					await this.userRepository.save(user)
					return user.mail;
				}
			}
			catch(err){
				throw new Error(`${err.message}`);
			}
		}

		async updatePhone(user_id: number, new_phone: string){
			try {
				const check_phone = /^[0-9]{10}$/.test(new_phone);
				if (!check_phone){
					throw new BadRequestException('Invalid phone format');
				}
				const user = await this.userRepository.findOne({ where: { id :user_id } });
				if (user){
					user.phone = new_phone;
					await this.userRepository.save(user)
					return user.phone;
				}
			}
			catch(err){
				throw new Error(`${err.message}`);
			}
		}
		async updatePwd(user_id: number, new_pwd: string){
			try {
				if (new_pwd.length < 6 || new_pwd.length > 16){
					throw new BadRequestException('Invalid password format: need min 6 characters and 15 characters max');
				}
				const hashedPassword = await bcrypt.hash(new_pwd, 10);
				const user = await this.userRepository.findOne({ where: { id :user_id } });
				if (user){
					user.password = hashedPassword;
					await this.userRepository.save(user)
					return new_pwd;
				}
			}
			catch(err){
				throw new Error(`${err.message}`);
			}
		}

		async acceptContract(user_id: number, new_contract: CreateContractDto){
			try {
				const user = await this.userRepository.findOne({ where: { id: user_id }, relations: ['contracts'] });
				user.contracts = user.contracts || []; 
				if (!user) {
					throw new NotFoundException('User not found');
				}
				if (user.contracts.length >= 5) {
					throw new BadRequestException('Maximum 5 contracts per user');
				}
				
				const existingContract = await this.contractRepository.findOne({
					where: {
							name: new_contract.name,
							user: user
					}
			});

			if (existingContract) {
					throw new BadRequestException('A contract with the same name already exists');
			}
				const contract = this.contractRepository.create({
					name: new_contract.name,
					image: new_contract.image,
					species: new_contract.species,
					gender: new_contract.gender,
					origin: new_contract.origin,
					location: new_contract.location,
				});
				await this.contractRepository.save(contract);
				user.contracts = [...user.contracts, contract];
				await this.userRepository.save(user);
				return user.contracts;
			}
			
			catch (err){
				throw new Error(`${err.message}`);
			}
		}
		
		
		async getUserContracts(user_id: number) : Promise<Contract[]>{
      try {
				const user = await this.userRepository.findOne({ where: { id: user_id }, relations: ['contracts'] });
				if (!user) {
					throw new NotFoundException('User not found');
				}
				return user.contracts;
			} catch (err) {
				throw new Error(`${err.message}`);
			}
		}

		async deleteContract(user_id: number, contract_id: number): Promise<void> {
			try {
				const contract = await this.contractRepository.findOne({where : {id : contract_id}, relations: ['user']})
				if (!contract) {
					throw new NotFoundException('Contract not found');
				}
				if (contract.user.id !== user_id) {
					throw new ForbiddenException("You don't have permission to delete this contract");
				}
				await this.contractRepository.remove(contract);
		}
		catch(err){
			throw new Error(`${err.message}`);
		}
	
	}

}