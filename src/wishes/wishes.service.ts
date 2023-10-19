import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}

  async create(ownerId: number, createWishDto: CreateWishDto) {
    const { password, ...user } = await this.usersService.findId(ownerId);
    return await this.wishRepository.save({ ...createWishDto, owner: user });
  }
}
