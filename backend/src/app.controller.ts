import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
	@ApiOperation({ summary: 'Say Hello'})
  getHello(): string {
    return this.appService.getHello();
  }
}
