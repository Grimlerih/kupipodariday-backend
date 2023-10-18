import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ServerExceptionFilter } from 'src/filter/server-exceptions.filter';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(ServerExceptionFilter)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  find(@Body() userAuth) {
    return this.authService.signin(userAuth);
  }
}
