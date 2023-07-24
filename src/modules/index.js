"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_module_1 = require("./auth/auth.module");
const artists_module_1 = require("./artists/artists.module");
const songs_module_1 = require("./songs/songs.module");
const API_PREFIX = '/api';
const modules = [
    {
        name: 'auth',
        module: auth_module_1.default.controller,
        entity: auth_module_1.default.entity,
        route: `${API_PREFIX}/auth`
    },
    {
        name: 'artists',
        module: artists_module_1.default.controller,
        entity: artists_module_1.default.entity,
        route: `${API_PREFIX}/artists`
    },
    {
        name: 'songs',
        module: songs_module_1.default.controller,
        entity: songs_module_1.default.entity,
        route: `${API_PREFIX}/songs`
    }
];
exports.default = modules;
//# sourceMappingURL=index.js.map