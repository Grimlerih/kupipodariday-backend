import { Entity, Column } from 'typeorm';
import { Base } from '../../entity/base.entity';
import { Length, IsUrl } from 'class-validator';

@Entity()
export class Wish extends Base {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    scale: 2,
  })
  price: number;

  @Column({
    scale: 2,
  })
  raised: number;

  @Column()
  owner: string;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column()
  offers: string;

  @Column()
  copied: string;
}
