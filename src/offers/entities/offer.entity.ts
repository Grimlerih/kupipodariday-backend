import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Base } from '../../entity/base.entity';
import { Length, IsUrl, IsNumber, IsBoolean } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Offer extends Base {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({
    scale: 2,
  })
  @IsNumber()
  amount: number;

  @Column()
  @IsBoolean()
  hidden: boolean;
}
