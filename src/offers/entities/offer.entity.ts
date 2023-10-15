import { Entity, Column } from 'typeorm';
import { Base } from '../../entity/base.entity';
import { Length, IsUrl, IsNumber, IsBoolean } from 'class-validator';

@Entity()
export class Offer extends Base {
  @Column()
  @Length(1, 250)
  user: string;

  @Column()
  @IsUrl()
  item: string;

  @Column({
    scale: 2,
  })
  @IsNumber()
  amount: number;

  @Column()
  @IsBoolean()
  hidden: boolean;
}
