import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  async create(ownerId: number, createWishDto: CreateWishDto) {
    const { password, ...user } = await this.usersService.findId(ownerId);
    return await this.wishRepository.save({ ...createWishDto, owner: user });
  }

  async findById(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: id },
      relations: { owner: true, offers: true },
    });
    return wish;
  }

  // async updateWish(wishId: number , ownerId: number, updateDto: any) {
  //   const wish = await this.findById(wishId)

  //   if (ownerId !== wish.owner.id){
  //     throw new ForbiddenException('Можно обновлять только свои подарки');
  //   }

  //   return this.wishRepository.update(wishId, updateDto)

  // }

  async deleteWish(id: number) {
    const wish = await this.findById(id);
    if (wish) {
      await this.wishRepository.delete(id);
      return wish;
    } else {
      throw new NotFoundException('Указанный подарок не найден');
    }
  }

  async copyWish(wishId: number, userId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
    });
    const user = await this.usersService.findId(userId);

    if (wish && user) {
      user.wishes.push(wish);
    }

    return this.userRepository.save(user);
  }
}
