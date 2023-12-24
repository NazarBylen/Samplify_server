import { Controller, Get, Param } from '@nestjs/common';
import { ArtistsService } from "./artists.service"
import Artists from "./artists.entity";

@Controller('artists')
export class ArtistsController {
    constructor(private artistsService: ArtistsService) {}

    @Get("/")
    async findAll(): Promise<Artists[]> {
        return await this.artistsService.getArtists()
    }

    @Get("/songs")
    async findArtistsWithSongs(): Promise<Artists[]> {
        return await this.artistsService.getArtistsWithSongs()
    }

    @Get("/:slug")
    async findBySlug(@Param('slug') slug: string): Promise<Artists | null> {
        return await this.artistsService.getArtist(slug)
    }
}
