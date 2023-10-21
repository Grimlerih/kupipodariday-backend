import {
  IsArray,
  IsDate,
  IsInt,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';

export class UserWishDto {
  @IsInt()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  link: string;

  @IsString()
  image: string;

  @IsInt()
  price: number;

  @IsInt()
  raised: number;

  @IsInt()
  copied: number;

  @IsString()
  @Length(1, 1024)
  description: string;

  @IsArray()
  offers: Offer[];
}
