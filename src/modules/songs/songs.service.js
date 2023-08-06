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
exports.getSongsByArtist = exports.getSongs = exports.getSongsWithArtist = void 0;
const db_1 = require("../../services/db");
const songs_entity_1 = require("../songs/songs.entity");
const pagination_1 = require("../../utils/pagination");
const getSongsWithArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songsRepository = db_1.dbInstance.getRepository(songs_entity_1.default);
        const allSongs = yield songsRepository.find({
            relations: {
                artist: true,
            },
        });
        return res.status(200).json(allSongs);
    }
    catch (error) {
        return next(error);
    }
});
exports.getSongsWithArtist = getSongsWithArtist;
const getSongs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songsRepository = db_1.dbInstance.getRepository(songs_entity_1.default);
        const allSongs = yield songsRepository.find();
        return res.status(200).json(allSongs);
    }
    catch (error) {
        return next(error);
    }
});
exports.getSongs = getSongs;
const getSongsByArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { page = 1 } = req.query;
        const songsRepository = db_1.dbInstance.getRepository(songs_entity_1.default);
        const allSongs = yield songsRepository.findAndCount({
            where: {
                artistId: id
            },
            skip: (0, pagination_1.paginationOffset)(page),
            take: (0, pagination_1.paginationLimit)(),
        });
        const [songs, totalRecords] = allSongs;
        const paginate = (0, pagination_1.pagination)({
            total: totalRecords,
            page
        });
        return res.status(200).json({
            meta: Object.assign({}, paginate),
            data: songs
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.getSongsByArtist = getSongsByArtist;
//# sourceMappingURL=songs.service.js.map