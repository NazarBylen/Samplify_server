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
exports.Favourites = void 0;
const typeorm_1 = require("typeorm");
const songs_entity_1 = require("../songs/songs.entity");
const users_entity_1 = require("../auth/users.entity");
let Favourites = exports.Favourites = class Favourites {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Favourites.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Favourites.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'song_id' }),
    __metadata("design:type", Number)
], Favourites.prototype, "songId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => users_entity_1.default, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", users_entity_1.default)
], Favourites.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => songs_entity_1.default, (songs) => songs.id),
    (0, typeorm_1.JoinColumn)({ name: "song_id" }),
    __metadata("design:type", songs_entity_1.default)
], Favourites.prototype, "song", void 0);
exports.Favourites = Favourites = __decorate([
    (0, typeorm_1.Entity)('favourites')
], Favourites);
exports.default = Favourites;
//# sourceMappingURL=favourites.entity.js.map