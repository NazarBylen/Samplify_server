import * as express from 'express'
import * as favouritesService from './favourites.service'

const favouritesController = express.Router();

favouritesController.get("/", async function(req, res, next) {
    return await favouritesService.getAllFavourites(req, res, next);
})

favouritesController.get("/getFavourite/:userId", async function(req, res, next) {
    return await favouritesService.getFavouriteSongsById(req, res, next);
})

favouritesController.post("/addFavourite", async function (req, res,next){
    return await favouritesService.saveToFavourites(req, res, next);
})


export default favouritesController;