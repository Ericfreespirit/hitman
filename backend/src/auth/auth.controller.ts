import { Controller, Post, Req, Res,Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Request , Response} from 'express';
import { Repository} from 'typeorm';
import { AuthService } from './auth.service';
import { ApiTags,ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from '../user/user.dto'


@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(
		@InjectRepository(User)
    private readonly userRepository: Repository<User>,
		private readonly authService: AuthService
		) {}

  @Post('register')
	@ApiOperation({ summary: 'Register a new user' })
	@ApiParam({ name: 'mail', type: 'string'})
	@ApiParam({ name: 'password', type: 'string'})
  @ApiResponse({ status: 201, description: 'Registration complete',	})
  @ApiResponse({ status: 401, description: 'Mail already exists or mail not in the database member' })
  async register(@Req() req: Request, @Res() res: Response): Promise<void>{
		try {
			const profil : CreateUserDto = {
				username: req.query.username as string,
				first_name: req.query.first_name as string,
				last_name: req.query.last_name as string,
				mail: req.query.mail as string,
				pwd: req.query.pwd as string,
				phone: req.query.phone as string,
			}

			const register_content = await this.authService.register(profil);
			if (!register_content) {
				res.status(400).json({ error: 'mail or username already exists' });
			} else {
				res.status(201).json({register_content});
			}
		}
		catch (err) {
			res.status(500).json({ error: err.message });
		}
  }

  @Post('login')
	@ApiOperation({ summary: 'Log a user' })
	@ApiParam({ name: 'username', type: 'string'})
	@ApiParam({ name: 'password', type: 'string'})
  @ApiResponse({ status: 200, description: 'User logged',	})
  @ApiResponse({ status: 401, description: 'User not found' })
  async login(@Req() req: Request, @Res() res: Response) : Promise<void> {
		const username: string = req.query.username as string; 
		const password: string = req.query.password as string; 
		try{
		const token = await 	this.authService.login(username, password);
		if (!token)
			res.status(401).send({ error: 'username or/and password is wrong' });
		res.status(200).json(token);
		}
		catch(err){
			res.status(500).json({ error: err.message });
		}
  }


	@Get('verify-token')
	@ApiOperation({ summary: 'Verify token' })
	@ApiParam({ name: 'token', type: 'string'})
  @ApiResponse({ status: 200, description: 'token valid',	})
  @ApiResponse({ status: 401, description: 'token invalid' })
  async verifyToken(@Req() req: Request, @Res() res: Response) : Promise<void> {
		const token: string = req.query.token as string; 
		try {
			const verify = await this.authService.verifyToken(token);		
			if (!verify) {
				res.status(401).json({ error: 'token is wrong' });
			} else {
				res.status(200).json(verify);
			}
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
  }


}