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

    getArtists(): Promise<Artists[]> {
        return this.artistRepository.find();
    }

    getArtistsWithSongs(): Promise<Artists[]> {
        return this.artistRepository.find({
            relations: {
                songs: true,
            }
        });
    }

    getArtist(slug: string): Promise<Artists | null> {
        return this.artistRepository.findOneBy({ slug });
    }
}
