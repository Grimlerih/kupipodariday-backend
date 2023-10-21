import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Wish } from 'src/wishes/entities/wish.entity';
import { ServerException } from 'src/exceptions/server.exception';
import { ErrorCode } from 'src/exceptions/error-codes';

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

    if (items) {
      return await this.wishListReopsitory.save({
        ...wishlist,
        items: items,
        owner: user,
      });
    } else {
      throw new ServerException(ErrorCode.WishlistNotFound);
    }
  }

  async findAll() {
    const wishList = await this.wishListReopsitory.find({
      relations: ['owner', 'items'],
    });

    if (!wishList) {
      throw new ServerException(ErrorCode.WishListError);
    }

    return wishList;
  }

  async findById(wishlistId: number) {
    const wishList = this.wishListReopsitory.findOne({
      where: { id: wishlistId },
      relations: ['items', 'owner'],
    });

    if (!wishList) {
      throw new ServerException(ErrorCode.WishListError);
    }
    return wishList;
  }

  async delete(id: number) {
    const wishList = await this.findById(id);

    if (wishList) {
      await this.wishListReopsitory.delete(id);
      return wishList;
    } else {
      throw new ServerException(ErrorCode.WishListError);
    }
  }
}
