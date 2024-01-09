import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { FavouritesDto, AddFavouritesDto } from "./favourites.dto"
import * as jwt from "jsonwebtoken";
import { decodeToken } from "../../../utils/jwt"

@Controller('favourites')
export class FavouritesController {
    constructor(private favouritesService: FavouritesService) {}

    @Get("/")
    async getFavouritesByUserId(@Req() req: Request): Promise<FavouritesDto[]> {
        const token = req.headers["authorization"].replace("Bearer ", "");
        const decodedToken = await decodeToken(token)
        const userId = decodedToken['userId']
        return await this.favouritesService.getFavouriteSongsById(Number(userId), decodedToken['exp'])
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
