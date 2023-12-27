import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { FavouritesDto, AddFavouritesDto } from "./favourites.dto"

@Controller('favourites')
export class FavouritesController {
    constructor(private favouritesService: FavouritesService) {}

    @Get("/")
    async findAll(): Promise<FavouritesDto[]> {
        return await this.favouritesService.getFavourites()
    }

    @Get("/:userId")
    async findByUserId(@Param('userId') userId: string): Promise<FavouritesDto[]> {

        return await this.favouritesService.getFavouriteSongsById(Number(userId))
    }

    @Post("/")
    async saveToFavourites(@Body() userData:AddFavouritesDto) {
        const userId = Number(userData.userId);
        const songId = userData.songId;

        return await this.favouritesService.saveToFavourites(userId, songId)
    }

    @Delete("/:songId")
    async deleteFromFavourites(@Param('songId') songId: string) {
        return await this.favouritesService.deleteFromFavourites(Number(songId))
    }
}
