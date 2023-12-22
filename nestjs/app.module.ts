import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ArtistsModule} from "./src/modules/artists/artists.module"
import { Artists } from "./src/modules/artists/artists.entity"
import { Songs } from "./src/modules/songs/songs.entity"
import { SongsModule } from "./src/modules/songs/songs.module"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'samplify',
      entities: [Artists, Songs],
      synchronize: true,
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './public'),
      exclude: ['/api/(.*)'],
    }),
    ArtistsModule, SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
