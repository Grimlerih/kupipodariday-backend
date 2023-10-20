import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListReopsitory: Repository<Wishlist>,
    @InjectRepository(Wish)
    private wishReopsitory: Repository<Wish>,
    private userService: UsersService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, ownerId: number) {
    const { password, ...user } = await this.userService.findId(ownerId, false);

    const { itemsId, ...wishlist } = createWishlistDto;

    const items = await this.wishReopsitory.find({
      where: {
        id: In(itemsId),
      },
    });

    return await this.wishListReopsitory.save({
      ...wishlist,
      items: items,
      owner: user,
    });
  }

  async findAll() {
    return this.wishListReopsitory.find({
      relations: { owner: true, items: true },
    });
  }

  async findById(wishlistId: number) {
    return this.wishListReopsitory.findOne({
      where: { id: wishlistId },
      relations: ['items', 'owner'],
    });
  }

  async delete(id: number) {
    const wishList = await this.findById(id);

    await this.wishListReopsitory.delete(id);

    return wishList;
  }
}
