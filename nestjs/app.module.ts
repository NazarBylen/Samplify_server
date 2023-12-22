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
import { AuthModule } from "./src/modules/auth/auth.module"
import { Users } from "./src/modules/auth/users.entity"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'samplify',
      entities: [Artists, Songs, Users,],
      synchronize: true,
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './public'),
      exclude: ['/api/(.*)'],
    }),
    ArtistsModule, SongsModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
