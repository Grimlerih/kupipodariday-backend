import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExcludePasswordInterceptor } from 'src/interceptor/user-password.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { FindUserDto } from './dto/find-user.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ExcludePasswordInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findMe(@Request() { user: { id } }) {
    return await this.usersService.findId(id);
  }

  @Patch('me')
  async update(
    @Request() { user: { id } },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get('me/wishes')
  async getMyWishes(@Request() { user: { id } }): Promise<Wish[]> {
    return this.usersService.getMyWishes(id);
  }

  @Get(':username')
  async findUserByName(@Param('username') username: string) {
    return this.usersService.findUserName(username);
  }

  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string) {
    return this.usersService.findUserNameWishes(username);
  }

  @Post('find')
  async findUser(@Body() query: FindUserDto) {
    return this.usersService.findUser(query.query);
  }
}
