import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashModule } from './hash/hash.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WishesModule,
    OffersModule,
    UsersModule,
    WishlistsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dbConfig,
    }),
    AuthModule,
    HashModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
