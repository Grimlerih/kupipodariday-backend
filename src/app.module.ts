import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offers/entities/offer.entity';
import { User } from './users/entities/user.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    WishesModule,
    OffersModule,
    UsersModule,
    WishlistsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday-base',
      entities: [Offer, User, Wish, Wishlist],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
