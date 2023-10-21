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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Request() { user: { id } }, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(id, createWishDto);
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.wishesService.findById(id);
  }

  // @Patch(':id')
  // update(@Param('id') wishId: number, @Request(){ user: {id} }, @Body() updateDto: any ) {
  //   return this.wishesService.updateWish(wishId,id, updateDto);
  // }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.wishesService.deleteWish(id);
  }

  @Post(':id/copy')
  copy(@Param('id') wishId: number, @Request() { user: { id } }) {
    return this.wishesService.copyWish(wishId, id);
  }

  @Get('last')
  getLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  getTop() {
    return this.wishesService.findTop();
  }
}
