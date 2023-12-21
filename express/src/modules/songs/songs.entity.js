"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Songs = void 0;
const typeorm_1 = require("typeorm");
const artists_entity_1 = require("../artists/artists.entity");
let Songs = exports.Songs = class Songs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Songs.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Songs.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'artist_id' }),
    __metadata("design:type", Number)
], Songs.prototype, "artistId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true
    }),
    __metadata("design:type", String)
], Songs.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => artists_entity_1.default, (artists) => artists.songs),
    (0, typeorm_1.JoinColumn)({ name: "artist_id" }),
    __metadata("design:type", artists_entity_1.default)
], Songs.prototype, "artist", void 0);
exports.Songs = Songs = __decorate([
    (0, typeorm_1.Entity)('songs')
], Songs);
exports.default = Songs;
//# sourceMappingURL=songs.entity.js.map