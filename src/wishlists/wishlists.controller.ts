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
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(
    @Body() createWishlistDto: CreateWishlistDto,
    @Request() { user: { id } },
  ) {
    return this.wishlistsService.create(createWishlistDto, id);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') wishListId: number) {
    return this.wishlistsService.findById(wishListId);
  }

  @Delete(':id')
  delete(@Param('id') wishListId: number) {
    console.log(wishListId);

    return this.wishlistsService.delete(wishListId);
  }
}
