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
const express = require("express");
const favouritesService = require("./favourites.service");
const favouritesController = express.Router();
favouritesController.get("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield favouritesService.getAllFavourites(req, res, next);
    });
});
favouritesController.get("/:userId", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield favouritesService.getFavouriteSongsById(req, res, next);
    });
});
favouritesController.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield favouritesService.saveToFavourites(req, res, next);
    });
});
favouritesController.delete("/:songId", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield favouritesService.deleteFromFavourites(req, res, next);
    });
});
exports.default = favouritesController;
//# sourceMappingURL=favourites.controller.js.map