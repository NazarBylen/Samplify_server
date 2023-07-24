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
const songsService = require("./songs.service");
const songsController = express.Router();
songsController.get("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield songsService.getSongs(req, res, next);
    });
});
songsController.get("/artist", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield songsService.getSongsWithArtist(req, res, next);
    });
});
exports.default = songsController;
//# sourceMappingURL=songs.controller.js.map