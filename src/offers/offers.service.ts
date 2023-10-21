import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private wishService: WishesService,
    private userService: UsersService,
  ) {}

  async create(createOfferDto: CreateOfferDto, id: number) {
    const user = await this.userService.findId(id, false);

    const item = await this.wishService.findById(createOfferDto.itemId);

    const raiseSum = Number((item.raised + createOfferDto.amount).toFixed(2));

    await this.wishService.raisedUpdate(createOfferDto.itemId, {
      raised: raiseSum,
    });

    return await this.offerRepository.save({
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden,
      item: item,
      user: user,
    });
  }
}
