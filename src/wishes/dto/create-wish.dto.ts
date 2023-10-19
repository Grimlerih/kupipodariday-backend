import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateWishDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  @IsUrl()
  link: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;
}
