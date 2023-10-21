import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { AuthGuard } from '@nestjs/passport';
import { Wishlist } from './entities/wishlist.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(
    @Body() createWishlistDto: CreateWishlistDto,
    @Request() { user: { id } },
  ): Promise<Wishlist> {
    return this.wishlistsService.create(createWishlistDto, id);
  }

  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') wishListId: number): Promise<Wishlist> {
    return this.wishlistsService.findById(wishListId);
  }

  @Delete(':id')
  delete(@Param('id') wishListId: number): Promise<Wishlist> {
    return this.wishlistsService.delete(wishListId);
  }
}
