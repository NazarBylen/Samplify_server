import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artists } from './artists.entity';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artists)
        private artistRepository: Repository<Artists>,
    ) {}

    async getArtists(): Promise<Artists[]> {
        return await this.artistRepository.find();
    }

    async getArtistsWithSongs(): Promise<Artists[]> {
        return await this.artistRepository.find({
            relations: {
                songs: true,
            }
        });
    }

    async getArtist(slug: string): Promise<Artists | null> {
        return await this.artistRepository.findOneBy({ slug });
    }
}
