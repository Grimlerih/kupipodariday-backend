import { Entity, Column } from 'typeorm';
import { Base } from '../../entity/base.entity';
import { Length, IsUrl } from 'class-validator';

@Entity()
export class Wishlist extends Base {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  items: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @Length(1, 1500)
  description: string;
}
