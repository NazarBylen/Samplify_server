import {dbInstance} from "../../services/db";
import favouritesEntity, {Favourites} from "./favourites.entity";

export const getAllFavourites = async (req, res, next) => {
    try {
        const favouritesRepository = dbInstance.getRepository(favouritesEntity)
        const allFavourites = await favouritesRepository.find({
            relations: {
                song: true,
                user: true,
            },
        })
        return res.status(200).json(allFavourites)
    } catch (error) {
        return next(error)
    }
}


export const getFavouriteSongsById = async (req, res, next) => {
    try {
        const {userId} = req.params

        const favouritesRepository = dbInstance.getRepository(favouritesEntity)
        const allFavourites = await favouritesRepository.find({
            where: {
                userId,
            },
            relations: ['song', 'song.artist']
        })

        return res.status(200).json(allFavourites)
    } catch (error) {
        return next(error)
    }
}


export const saveToFavourites = async (req, res, next) => {
    try {
        const {songId, userId} = req.body

        const favouritesRepository = dbInstance.getRepository(favouritesEntity)
        const favourites = new Favourites()

        favourites.songId = songId;
        favourites.userId = userId;

        await favouritesRepository.save(favourites)

        return res.status(201).json();
    } catch (error) {
        return next(error)
    }
}