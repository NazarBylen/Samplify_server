import * as express from 'express'

import * as artistsService from './artists.service';

const artistsController = express.Router();

artistsController.get("/", async function(req, res, next) {
    return await artistsService.getArtists(req, res, next);
})

artistsController.get("/songs", async function(req, res, next) {
    return await artistsService.getArtistsWithSongs(req, res, next);
})

artistsController.get("/:slug", async function(req, res, next) {
    return await artistsService.getArtist(req, res, next);
})

export default artistsController;
