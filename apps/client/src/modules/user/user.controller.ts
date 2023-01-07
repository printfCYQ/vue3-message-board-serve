import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../jwt.auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello() {
    return this.userService.test();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/current')
  current(@Request() req) {
    const { id } = req.user;
    return this.userService.current(id);
  }

  @Post('/login')
  login(@Body() body) {
    return this.userService.login(body);
  }

  @Get('/logout')
  lougout() {
    return this.userService.logout();
  }

  @Post('/register')
  register(@Body() body) {
    return this.userService.register(body);
  }
}
