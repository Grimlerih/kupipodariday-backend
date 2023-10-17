import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ServerExceptionFilter } from 'src/filter/server-exceptions.filter';

@UseFilters(ServerExceptionFilter)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() user: SignUpDto) {
    return this.authService.signup(user);
  }

  @Post('signin')
  find(@Body() userAuth: SignInDto) {
    return this.authService.signin(userAuth);
  }
}
