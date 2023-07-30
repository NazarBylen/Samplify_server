import * as express from 'express'
import * as favouritesService from './favourites.service'

const favouritesController = express.Router();

favouritesController.get("/", async function(req, res, next) {
    return await favouritesService.getAllFavourites(req, res, next);
})

favouritesController.get("/:userId", async function(req, res, next) {
    return await favouritesService.getFavouriteSongsById(req, res, next);
})

favouritesController.post("/", async function (req, res,next){
    return await favouritesService.saveToFavourites(req, res, next);
})

favouritesController.delete("/:songId", async function (req, res,next){
    return await favouritesService.deleteFromFavourites(req, res, next);
})


export default favouritesController;