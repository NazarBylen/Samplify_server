import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { Favourites } from "./favourites.entity"
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavouritesController } from "./favourites.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Favourites])],
    controllers: [FavouritesController],
    providers: [FavouritesService],
})
export class FavouritesModule {}
