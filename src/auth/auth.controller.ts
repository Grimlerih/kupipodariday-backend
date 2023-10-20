import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ServerExceptionFilter } from 'src/filter/server-exceptions.filter';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { ExcludePasswordInterceptor } from 'src/interceptor/user-password.interceptor';

@UseFilters(ServerExceptionFilter)
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
