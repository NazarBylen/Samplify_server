import {dbInstance} from "../../services/db";
import songsEntity from "../songs/songs.entity";

export const getSongsWithArtist = async (req, res, next) => {
    try {
        const songsRepository = dbInstance.getRepository(songsEntity)
        const allSongs = await songsRepository.find({
            relations: {
                artist: true,
            },
        })
        return res.status(200).json(allSongs)
    } catch (error) {
        return next(error)
    }
}

export const getSongs = async (req, res, next) => {
    try {
        const songsRepository = dbInstance.getRepository(songsEntity)
        const allSongs = await songsRepository.find()
        return res.status(200).json(allSongs)
    } catch (error) {
        return next(error)
    }
}