import { Controller, Get, Param } from '@nestjs/common';
import { ArtistsService } from "./artists.service"
import Artists from "./artists.entity";

@Controller('artists')
export class ArtistsController {
    constructor(private artistsService: ArtistsService) {}

    @Get("/")
    findAll(): Promise<Artists[]> {
        return this.artistsService.getArtists()
    }

    @Get("/songs")
    findArtistsWithSongs(): Promise<Artists[]> {
        return this.artistsService.getArtistsWithSongs()
    }

    @Get("/:slug")
    findBySlug(@Param('slug') slug: string): Promise<Artists | null> {
        return this.artistsService.getArtist(slug)
    }
}
