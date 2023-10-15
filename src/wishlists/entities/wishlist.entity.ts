import { Entity, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Base } from '../../entity/base.entity';
import { Length, IsUrl } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Wishlist extends Base {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @Length(1, 1500)
  description: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @ManyToMany(() => Wish, (wish) => wish.name)
  @JoinTable()
  items: Wish[];
}
