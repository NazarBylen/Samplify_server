import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import Favourites from "./favourites.entity";

@Controller('favourites')
export class FavouritesController {
    constructor(private favouritesService: FavouritesService) {}

    @Get("/")
    async findAll(): Promise<Favourites[]> {
        return await this.favouritesService.getFavourites()
    }

    @Get("/:userId")
    async findByUserId(@Param('userId') userId: string): Promise<Favourites[]> {

        return await this.favouritesService.getFavouriteSongsById(Number(userId))
    }

    @Post("/")
    async saveToFavourites(@Body('userId') userId: number, @Body('songId') songId: number) {
        return await this.favouritesService.saveToFavourites(userId, songId)
    }

    @Delete("/:songId")
    async deleteFromFavourites(@Param('songId') songId: string) {
        return await this.favouritesService.deleteFromFavourites(Number(songId))
    }
}
