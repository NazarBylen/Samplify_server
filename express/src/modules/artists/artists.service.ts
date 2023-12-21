import artistsEntity from './artists.entity';
import {dbInstance} from "../../services/db";

export const getArtistsWithSongs = async (req, res, next) => {
    try {
        const artistsRepository = dbInstance.getRepository(artistsEntity)
        const allArtists = await artistsRepository.find({
            relations: {
                songs: true,
            },
        })
        return res.status(200).json(allArtists)
    } catch (error) {
        return next(error)
    }
}

export const getArtists = async (req, res, next) => {
    try {
        const artistsRepository = dbInstance.getRepository(artistsEntity)
        const allArtists = await artistsRepository.find()
        return res.status(200).json(allArtists)
    } catch (error) {
        return next(error)
    }
}

export const getArtist = async (req, res, next) => {
    try {
        const { slug } = req.params

        const { page=1 } = req.query;

        const artistsRepository = dbInstance.getRepository(artistsEntity)


        const artist = await artistsRepository.find({
            where: {
                slug,
            }
        })

        return res.status(200).json(artist[0]);

    } catch (error) {
        return next(error)
    }
}
