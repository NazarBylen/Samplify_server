import {dbInstance} from "../../services/db";
import songsEntity from "../songs/songs.entity";
import {pagination, paginationLimit, paginationOffset} from "../../utils/pagination";

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

export const getSongsByArtist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { page = 1 } = req.query;

        const songsRepository = dbInstance.getRepository(songsEntity)

        const allSongs = await songsRepository.findAndCount({
            where: {
                artistId: id
            },

            skip: paginationOffset(page),
            take: paginationLimit(),
            }
        )

        const [songs, totalRecords] = allSongs;

        const paginate = pagination({
            total: totalRecords,
            page
        })


        return res.status(200).json(
            {
                meta: {
                    ...paginate
                },
                data: songs
            }
        )
    } catch (error) {
        return next(error)
    }
}