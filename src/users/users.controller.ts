import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ExcludePasswordInterceptor } from 'src/interceptor/user-password.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './entities/user.entity';
import { UserWishDto } from './dto/user-wish.dto';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ExcludePasswordInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findMe(@Request() { user: { id } }): Promise<User> {
    return await this.usersService.findId(id);
  }

  @Patch('me')
  async update(
    @Request() { user: { id } },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Get('me/wishes')
  async getMyWishes(@Request() { user: { id } }): Promise<Wish[]> {
    return this.usersService.getMyWishes(id);
  }

  @Get(':username')
  async findUserByName(@Param('username') username: string): Promise<User> {
    return this.usersService.findUserName(username);
  }

  @Get(':username/wishes')
  async getUserWishes(
    @Param('username') username: string,
  ): Promise<UserWishDto[]> {
    return this.usersService.findUserNameWishes(username);
  }

  @Post('find')
  async findUser(@Body() query: FindUserDto): Promise<User> {
    return this.usersService.findUser(query.query);
  }
}
