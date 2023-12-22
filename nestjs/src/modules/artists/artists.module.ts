import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Artists } from "./artists.entity"
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Artists])],
    controllers: [ArtistsController],
    providers: [ArtistsService],
})
export class ArtistsModule {}
