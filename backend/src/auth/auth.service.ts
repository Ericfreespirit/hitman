import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


	async register (profil: CreateUserDto): Promise<string | null>{
		try {
			const validationRules = [
				{
					check: profil.username !== '' && profil.first_name !== '' && profil.last_name !== '',
				},
				{
					check: /^[0-9]{10}$/.test(profil.phone),
				},
				{
					check: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(profil.mail),
				},
				{
					check: profil.pwd.length >= 6 && profil.pwd.length <= 16,
				},
			];
	
			const invalidRule = validationRules.find(rule => !rule.check);
			if (invalidRule) {
				return null;
			}
			const user_mail = await this.userRepository.findOne({ where: { mail : profil.mail} });
			const user_username = await this.userRepository.findOne({ where: { username : profil.username} });
			if (user_mail || user_username){
				return null;
			}
			const hashedPassword = await bcrypt.hash(profil.pwd, 10);
      const newUser = this.userRepository.create({
				username: profil.username,
        first_name: profil.first_name,
        last_name: profil.last_name,
        mail: profil.mail,
        password: hashedPassword,
        phone: profil.phone,
      });

      await this.userRepository.save(newUser);
      return `Registration successful for ${profil.username}`;
		}	
		catch(err){
      throw new Error(`Registration failed: ${err.message}`);
		}
	}
	
	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.userRepository.findOne({ where: { username } });
		if (user && bcrypt.compareSync(password, user.password)) {
			const { password, ...result } = user;

			const accessToken = this.jwtService.sign({ sub: result.id });
			return { ...result, accessToken };		
		}
		return null;
	}

	async login(username: string, password: string): Promise<string | null>{
		try {
			const accessToken = await this.validateUser(username, password);
			if (!accessToken) 
				return null
			return (accessToken);
		} catch (err) {
			throw new Error(`Login failed: ${err.message}`);
		}
	}
	 
	async verifyToken(token: string): Promise<boolean>{
    try {
      const decodedToken = this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
	}
}

