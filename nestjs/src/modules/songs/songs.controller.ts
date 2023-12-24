import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongsService } from "./songs.service"
import Songs from "./songs.entity";

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService) {}

    @Get("/")
    async findAll(): Promise<Songs[]> {
        return await this.songsService.getSongs()
    }

    @Get("/artist")
    async findWithArtist(): Promise<Songs[]> {
        return await this.songsService.getSongsWithArtist()
    }

    @Get("/:id?")
    async findByArtist(@Param('id') id: number, @Query('page') page: number): Promise<{ data: any; meta: { per_page: number; total: any; pages: number; last_page: boolean; page: number } }> {
        return await this.songsService.getSongsByArtist(id, page)
    }
}
