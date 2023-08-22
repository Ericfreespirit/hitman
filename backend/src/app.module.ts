import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Contract } from './user/contract.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { jwtConstants } from './auth/constant';
import { AuthGuard } from './auth/auth.guard';


@Module({
  imports: [
		PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, 
    }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'Eric',
			database: 'hitman_db',
			synchronize: true,
			autoLoadEntities: true,    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Contract])

  ],

  controllers: [
		AppController,
		AuthController,
		UserController
	],
  providers: [
		AppService,
		AuthService,
		UserService,
		AuthGuard
	],
})
export class AppModule {}
