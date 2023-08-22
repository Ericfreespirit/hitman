import { Controller, Post, Delete, Req, Res,Get,UseGuards, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Request , Response} from 'express';
import { Repository} from 'typeorm';
import { UserService } from './user.service';
import { ApiTags,ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard'
import { tokenRequest, CreateContractDto, CreateUserDto } from './user.dto';



@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly userService: UserService
		) {}
		
	@UseGuards(AuthGuard)
	@Get('getData')
	@ApiOperation({ summary: 'Get id/first_name/last_name/mail/phone' })
  @ApiResponse({ status: 200, description: 'Success',	})
  async getData(@Req() req: tokenRequest, @Res() res: Response) : Promise<void> {
		try {
			const user_id = req.user.sub
				const userDto : CreateUserDto = await this.userService.getData(user_id);
				if (userDto){
					res.status(200).json(userDto);
				}
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
  }

	@UseGuards(AuthGuard)
	@Post('updateMail')
	@ApiOperation({ summary: 'Update user data' })
  @ApiResponse({ status: 200, description: 'Mail update',	})
  async updateMail(@Req() req: tokenRequest, @Res() res: Response) : Promise<void> {
		try {
			const user_id : number  = req.user.sub;
			const mail : string = req.query.mail as string;
			const mail_response = await this.userService.updateMail(user_id, mail);
			res.status(200).json(mail_response);
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

	@UseGuards(AuthGuard)
	@Post('updatePwd')
	@ApiOperation({ summary: 'Update user password' })
	@ApiResponse({ status: 200, description: 'Pwd valid',	})
	async updatePwd(@Req() req: tokenRequest, @Res() res: Response) : Promise<void> {
		try {
			const user_id : number  = req.user.sub;
			const pwd : string = req.query.pwd as string;
			await this.userService.updatePwd(user_id, pwd);
			res.status(200).json();
		} catch (err) {
			res.status(500).json(err.message);
		}
	}

	@UseGuards(AuthGuard)
	@Post('updatePhone')
		@ApiOperation({ summary: 'Update user phone number' })
		@ApiResponse({ status: 200, description: 'Pwd valid',	})
		async updatePhone(@Req() req: tokenRequest, @Res() res: Response) : Promise<void> {
			try {
				const user_id : number  = req.user.sub;
				const phone : string = req.query.phone as string;
				const phone_response = await this.userService.updatePhone(user_id, phone);
				res.status(200).json(phone_response);
			} catch (err) {
				res.status(500).json(err.message);
			}
 	 }

	@UseGuards(AuthGuard)
	@Post('acceptContract')
	@ApiOperation({ summary: 'Accept an assassination contract' })
	@ApiResponse({ status: 201, description: 'contract accepted',	})
	async acceptContract(@Req() req: tokenRequest, @Res() res: Response) : Promise<void>{
		try {
			const user_id : number  = req.user.sub;
			const contractDto : CreateContractDto = {
				name : req.query.name as string,
				image : req.query.image as string,
				species : req.query.species as string,
				gender : req.query.gender as string,
				origin : req.query.origin as string,
				location : req.query.location as string,
			}
			const contract_response = await this.userService.acceptContract(user_id, contractDto);
			res.status(201).json(contract_response);
	}
	catch(err) {
		res.status(500).json(err.message)
	}
 }
 	@UseGuards(AuthGuard)
 	@Get('contracts')
	 @ApiOperation({ summary: 'Get all contract(s) of a user' })
	 @ApiResponse({ status: 200, description: 'contract gotten',	})
 	async getUserContracts(@Req() req: tokenRequest, @Res() res: Response): Promise<void>{
		try{
			const user_id : number  = req.user.sub;
			const contract_response = await this.userService.getUserContracts(user_id);	
			res.status(200).json(contract_response);
		}
		catch(err){
			res.status(500).json(err.message)
		}
 	}

 	 @UseGuards(AuthGuard)
	 @Delete(':contractId')
	 @ApiOperation({ summary: 'Delete a contract of a user' })
	 @ApiResponse({ status: 204, description: 'contract deleted',	})
	 async deleteContract(
		@Param('contractId') contractId: number,
		@Res() res: Response,
		@Req() req: tokenRequest
		): Promise<void> {
		try{
			const user_id : number  = req.user.sub;
			await this.userService.deleteContract(user_id, contractId);
			res.status(204).json("Succesfully deleted");
		}		
		catch(err){
			res.status(500).json(err.message)
		}
	}

	@UseGuards(AuthGuard)
	@Get('whoami')
	@ApiOperation({ summary: 'Get user Id' })
  @ApiResponse({ status: 200, description: 'Id user return',	})
  async whoami(@Req() req: tokenRequest, @Res() res: Response) : Promise<void> {
		try {
			const user_id : number = req.user.sub
			if (!user_id) {
				res.status(401).json({ error: 'token is wrong' });
			} else {
				res.status(200).json(user_id);
			}
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
  }

}