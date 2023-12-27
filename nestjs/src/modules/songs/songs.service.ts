import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Songs } from './songs.entity';
import { SongsDto, SongsByArtistDto } from "./songs.dto"
import {pagination, paginationLimit, paginationOffset} from "../../../utils/pagination";

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Songs)
        private songsRepository: Repository<Songs>,
    ) {}

    async getSongs(): Promise<SongsDto[]> {
        return await this.songsRepository.find();
    }

    async getSongsWithArtist(): Promise<Songs[]> {
        return await this.songsRepository.find({
            relations: {
                artist: true,
            },
        });
    }

    async getSongsByArtist(id: number, page: number): Promise<SongsByArtistDto> {

        const allSongs = await this.songsRepository.findAndCount({
            where: {
                artistId: id,
            },
            skip: paginationOffset(page),
            take: paginationLimit(),
        });

        const [songs, totalRecords] = allSongs;

        const paginate = pagination({
            total: totalRecords,
            page
        })

        return (
            {
                meta: {
                    ...paginate
                },
                data: songs
            }
        )
    }
}
