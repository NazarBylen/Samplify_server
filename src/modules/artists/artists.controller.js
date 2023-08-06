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
const artistsService = require("./artists.service");
const artistsController = express.Router();
artistsController.get("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield artistsService.getArtists(req, res, next);
    });
});
artistsController.get("/songs", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield artistsService.getArtistsWithSongs(req, res, next);
    });
});
artistsController.get("/:slug", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield artistsService.getArtist(req, res, next);
    });
});
exports.default = artistsController;
//# sourceMappingURL=artists.controller.js.map