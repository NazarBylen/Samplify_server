"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtist = exports.getArtists = exports.getArtistsWithSongs = void 0;
const artists_entity_1 = require("./artists.entity");
const db_1 = require("../../services/db");
const getArtistsWithSongs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artistsRepository = db_1.dbInstance.getRepository(artists_entity_1.default);
        const allArtists = yield artistsRepository.find({
            relations: {
                songs: true,
            },
        });
        return res.status(200).json(allArtists);
    }
    catch (error) {
        return next(error);
    }
});
exports.getArtistsWithSongs = getArtistsWithSongs;
const getArtists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artistsRepository = db_1.dbInstance.getRepository(artists_entity_1.default);
        const allArtists = yield artistsRepository.find();
        return res.status(200).json(allArtists);
    }
    catch (error) {
        return next(error);
    }
});
exports.getArtists = getArtists;
const getArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const { page = 1 } = req.query;
        const artistsRepository = db_1.dbInstance.getRepository(artists_entity_1.default);
        const artist = yield artistsRepository.find({
            where: {
                slug,
            }
        });
        // const artistWithSongsResults = await artistsRepository
        //     .createQueryBuilder("artists")
        //     .leftJoinAndSelect("artists.songs", "songs")
        //     .take(1)
        //     .getMany()
        // const [songs, totalRecords] = ArtistWithSongsResults;
        // const paginate = pagination({
        //     total: totalRecords,
        //     page
        // })
        return res.status(200).json(artist[0]);
    }
    catch (error) {
        return next(error);
    }
});
exports.getArtist = getArtist;
//# sourceMappingURL=artists.service.js.map