import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [WishesModule, OffersModule, UsersModule, WishlistsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
