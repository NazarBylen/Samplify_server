import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Favourites } from "./favourites.entity"

@Injectable()
export class FavouritesService {
    constructor(
        @InjectRepository(Favourites)
        private favouritesRepository: Repository<Favourites>,
    ) {}

    async getFavourites(): Promise<Favourites[]> {
        return await this.favouritesRepository.find();
    }

    async getFavouriteSongsById(userId: number) {

        return await this.favouritesRepository.find({
            where: {
                userId,
            },
            relations: ['song', 'song.artist']
        });
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
