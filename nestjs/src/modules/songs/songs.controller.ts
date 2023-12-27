import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongsService } from "./songs.service"
import { SongsDto, SongsByArtistDto } from "./songs.dto";

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService) {}

    @Get("/")
    async findAll(): Promise<SongsDto[]> {
        return await this.songsService.getSongs()
    }

    @Get("/artist")
    async findWithArtist(): Promise<SongsDto[]> {
        return await this.songsService.getSongsWithArtist()
    }

    @Get("/:id?")
    async findByArtist(@Param('id') id: number, @Query('page') page: number): Promise<SongsByArtistDto> {
        return await this.songsService.getSongsByArtist(id, page)
    }
}
