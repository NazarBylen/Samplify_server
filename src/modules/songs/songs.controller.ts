import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongsService } from "./songs.service"
import Songs from "./songs.entity";

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService) {}

    @Get("/")
    findAll(): Promise<Songs[]> {
        return this.songsService.getSongs()
    }

    @Get("/artist")
    findWithArtist(): Promise<Songs[]> {
        return this.songsService.getSongsWithArtist()
    }

    @Get("/:id?")
    findByArtist(@Param('id') id: number, @Query('page') page: number): Promise<{ data: any; meta: { per_page: number; total: any; pages: number; last_page: boolean; page: number } }> {
        return this.songsService.getSongsByArtist(id, page)
    }
}
