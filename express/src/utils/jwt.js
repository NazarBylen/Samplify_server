"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jwt = require("jsonwebtoken");
function generateAccessToken(user) {
    return jwt.sign(user, 'ACCESS_TOKEN_SECRET', { expiresIn: "60m" });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user) {
    return jwt.sign(user, 'REFRESH_TOKEN_SECRET', { expiresIn: "120m" });
}
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=jwt.js.map