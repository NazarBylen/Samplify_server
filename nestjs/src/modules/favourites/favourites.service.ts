import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FavouritesDto } from "./favourites.dto"
import { Favourites } from "./favourites.entity"
import { isTokenExpired } from "../../../utils/jwt";

@Injectable()
export class FavouritesService {
    constructor(
        @InjectRepository(Favourites)
        private favouritesRepository: Repository<Favourites>,
    ) {}

    async getFavouriteSongsById(userId: number, expDate:string): Promise<FavouritesDto[]> {
        try {
            if (isTokenExpired(expDate)) throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
            return await this.favouritesRepository.find({
                where: {
                    userId,
                },
                relations: ['song', 'song.artist']
            });
        }
         catch (e) {
            throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
        }
    }

    async saveToFavourites(userId: number, songId: number) {

        const favourites = this.favouritesRepository.create({
            songId,
            userId,
        })

        await this.favouritesRepository.save(favourites)
    }

    async deleteFromFavourites(songId: number) {
        const favourites = new Favourites()

        favourites.id = songId

        await this.favouritesRepository.delete(favourites)
    }
}
