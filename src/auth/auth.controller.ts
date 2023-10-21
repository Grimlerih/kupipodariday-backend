import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { ExcludePasswordInterceptor } from 'src/interceptor/user-password.interceptor';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  //регистрация
  @UseInterceptors(ExcludePasswordInterceptor)
  @Post('signup')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  //войти
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  find(@Request() { user }) {
    return this.authService.signin(user);
  }
}
