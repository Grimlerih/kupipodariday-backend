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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { AuthGuard } from '@nestjs/passport';
import { Wish } from './entities/wish.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Request() { user: { id } }, @Body() createWishDto: CreateWishDto) {
    this.wishesService.create(id, createWishDto);
  }

  @Get(':id')
  find(@Param('id') id: number): Promise<Wish> {
    return this.wishesService.findById(id, ['owner', 'offers', 'offers.user']);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Wish> {
    return this.wishesService.deleteWish(id);
  }

  @Post(':id/copy')
  copy(@Param('id') wishId: number, @Request() { user: { id } }) {
    this.wishesService.copyWish(wishId, id);
  }

  @Get('last')
  getLast(): Promise<Wish[]> {
    return this.wishesService.findLast();
  }

  @Get('top')
  getTop(): Promise<Wish[]> {
    return this.wishesService.findTop();
  }
}
