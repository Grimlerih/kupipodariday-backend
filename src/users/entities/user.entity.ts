import { Entity, Column } from 'typeorm';
import { Base } from '../../entity/base.entity';
import { Length, IsEmail, IsUrl } from 'class-validator';

@Entity()
export class User extends Base {
  @Column({
    unique: true,
  })
  @Length(2, 30)
  username: string;

  @Column()
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  @IsUrl()
  avatar: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  wishes: string;

  @Column()
  offers: string;

  @Column()
  wishlists: string;
}
