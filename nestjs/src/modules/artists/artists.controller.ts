import { Controller, Get, Param } from '@nestjs/common';
import { ArtistsService } from "./artists.service"
import { ArtistsDto } from "./artists.dto"

@Controller('artists')
export class ArtistsController {
    constructor(private artistsService: ArtistsService) {}

    @Get("/")
    async findAll(): Promise<ArtistsDto[]> {
        return await this.artistsService.getArtists()
    }

    @Get("/songs")
    async findArtistsWithSongs(): Promise<ArtistsDto[]> {
        return await this.artistsService.getArtistsWithSongs()
    }

    @Get("/:slug")
    async findBySlug(@Param('slug') slug: string): Promise<ArtistsDto | null> {
        return await this.artistsService.getArtist(slug)
    }
}
