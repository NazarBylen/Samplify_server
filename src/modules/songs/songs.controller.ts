import * as express from 'express'
import * as songsService from './songs.service'

const songsController = express.Router();

songsController.get("/", async function(req, res, next) {
    return await songsService.getSongs(req, res, next);
})

songsController.get("/artist", async function(req, res, next) {
    return await songsService.getSongsWithArtist(req, res, next);
})

songsController.get("/:id", async function(req, res, next) {
    return await songsService.getSongsByArtist(req, res, next);
})


export default songsController;