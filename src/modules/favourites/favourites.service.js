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
exports.deleteFromFavourites = exports.saveToFavourites = exports.getFavouriteSongsById = exports.getAllFavourites = void 0;
const db_1 = require("../../services/db");
const favourites_entity_1 = require("./favourites.entity");
const getAllFavourites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favouritesRepository = db_1.dbInstance.getRepository(favourites_entity_1.default);
        const allFavourites = yield favouritesRepository.find({
            relations: {
                song: true,
                user: true,
            },
        });
        return res.status(200).json(allFavourites);
    }
    catch (error) {
        return next(error);
    }
});
exports.getAllFavourites = getAllFavourites;
const getFavouriteSongsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const favouritesRepository = db_1.dbInstance.getRepository(favourites_entity_1.default);
        const allFavourites = yield favouritesRepository.find({
            where: {
                userId,
            },
            relations: ['song', 'song.artist']
        });
        return res.status(200).json(allFavourites);
    }
    catch (error) {
        return next(error);
    }
});
exports.getFavouriteSongsById = getFavouriteSongsById;
const saveToFavourites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { songId, userId } = req.body;
        const favouritesRepository = db_1.dbInstance.getRepository(favourites_entity_1.default);
        const favourites = new favourites_entity_1.Favourites();
        favourites.songId = songId;
        favourites.userId = userId;
        yield favouritesRepository.save(favourites);
        return res.status(201).json();
    }
    catch (error) {
        return next(error);
    }
});
exports.saveToFavourites = saveToFavourites;
const deleteFromFavourites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { songId } = req.params;
        const favouritesRepository = db_1.dbInstance.getRepository(favourites_entity_1.default);
        const favourites = new favourites_entity_1.Favourites();
        favourites.id = songId;
        yield favouritesRepository.delete(favourites);
        return res.status(201).json();
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteFromFavourites = deleteFromFavourites;
//# sourceMappingURL=favourites.service.js.map