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
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  async create(ownerId: number, createWishDto: CreateWishDto) {
    const { password, ...user } = await this.usersService.findId(ownerId);

    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }

    const wish = await this.wishRepository.save({
      ...createWishDto,
      owner: user,
    });

    if (!wish) {
      throw new ServerException(ErrorCode.SaveError);
    }

    return wish;
  }

  async findById(id: number, relationLoad: string[] = []) {
    const wish = await this.wishRepository.findOne({
      where: { id: id },
      relations: relationLoad,
    });

    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    return wish;
  }

  async deleteWish(wishId: number, id: number) {
    const wish = await this.findById(wishId, [
      'owner',
      'offers',
      'offers.user',
    ]);
    if (wish.owner.id === id) {
      await this.wishRepository.delete(wishId);
      return wish;
    } else {
      throw new ServerException(ErrorCode.WishDeleteError);
    }
  }

  async copyWish(wishId: number, userId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id: wishId },
    });

    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }

    const user = await this.usersService.findId(userId);

    if (wish && user) {
      user.wishes.push(wish);
    }

    const update = await this.wishRepository.update(wishId, {
      copied: wish.copied + 1,
    });

    if (!update) {
      throw new ServerException(ErrorCode.UpdateError);
    }

    return this.userRepository.save(user);
  }

  async raisedUpdate(id: number, updateData: any) {
    const wish = await this.wishRepository.update(id, updateData);

    if (!wish) {
      throw new ServerException(ErrorCode.UpdateError);
    }

    return wish;
  }

  async findTop() {
    const wishes = await this.wishRepository.find({
      order: { copied: 'desc' },
      take: 20,
    });

    if (!wishes) {
      throw new ServerException(ErrorCode.WishesNotFound);
    }

    return wishes;
  }

  async findLast() {
    const wishes = await this.wishRepository.find({
      order: { createdAt: 'desc' },
      take: 40,
    });

    if (!wishes) {
      throw new ServerException(ErrorCode.WishesNotFound);
    }

    return wishes;
  }
}
