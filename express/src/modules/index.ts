import authModule from './auth/auth.module';
import artistsModule from "./artists/artists.module";
import songsModule from "./songs/songs.module";
import favouritesModule from "./favourites/favourites.module";

const API_PREFIX = '/api'

const modules = [
    {
        name: 'auth',
        module: authModule.controller,
        entity: authModule.entity,
        route: `${API_PREFIX}/auth`
    },
    {
        name: 'artists',
        module: artistsModule.controller,
        entity: artistsModule.entity,
        route: `${API_PREFIX}/artists`
    },
    {
        name: 'songs',
        module: songsModule.controller,
        entity: songsModule.entity,
        route: `${API_PREFIX}/songs`
    },
    {
        name: 'favourites',
        module: favouritesModule.controller,
        entity: favouritesModule.entity,
        route: `${API_PREFIX}/favourites`
    },
];

export default modules;
