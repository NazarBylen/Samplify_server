import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Songs } from "./songs.entity"
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Songs])],
    controllers: [SongsController],
    providers: [SongsService],
})
export class SongsModule {}
