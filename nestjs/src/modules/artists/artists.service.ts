import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artists } from './artists.entity';
import { ArtistsDto } from "./artists.dto"

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artists)
        private artistRepository: Repository<Artists>,
    ) {}

    async getArtists(): Promise<ArtistsDto[]> {
        return await this.artistRepository.find();
    }

    async getArtistsWithSongs(): Promise<ArtistsDto[]> {
        return await this.artistRepository.find({
            relations: {
                songs: true,
            }
        });
    }

    async getArtist(slug: string): Promise<ArtistsDto | null> {
        return await this.artistRepository.findOneBy({ slug });
    }
}
