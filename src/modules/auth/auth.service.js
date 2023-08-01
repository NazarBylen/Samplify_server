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
exports.deleteAccount = exports.changePassword = exports.userInfo = exports.logIn = exports.signUp = void 0;
const bcrypt = require("bcrypt");
const db_1 = require("../../services/db");
const jwt_1 = require("../../utils/jwt");
const users_entity_1 = require("./users.entity");
const favourites_entity_1 = require("../favourites/favourites.entity");
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const usersRepository = db_1.dbInstance.getRepository(users_entity_1.default);
            const users = new users_entity_1.default();
            const saltRounds = 10;
            const salt = yield bcrypt.genSalt(saltRounds);
            const hash = yield bcrypt.hash(password, salt);
            users.email = email;
            users.password = hash;
            yield usersRepository.save(users);
            return res.status(201).json();
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.signUp = signUp;
function logIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const usersRepository = db_1.dbInstance.getRepository(users_entity_1.default);
            const user = yield usersRepository.findOneBy({ email });
            if (!user)
                throw { message: "User does not exist", status: 404 };
            const checkPassword = yield bcrypt.compare(password, user.password);
            if (!checkPassword)
                throw { message: "Wrong username or password", status: 401 };
            const accessToken = (0, jwt_1.generateAccessToken)({ email });
            const refreshToken = (0, jwt_1.generateRefreshToken)({ email });
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            const id = user.id;
            yield usersRepository.save(user);
            return res.status(200).json({ id, email, accessToken, refreshToken });
        }
        catch (error) {
            error.statusCode = 404;
            return next(error);
        }
    });
}
exports.logIn = logIn;
function userInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const usersRepository = db_1.dbInstance.getRepository(users_entity_1.default);
            const currentUser = yield usersRepository.findOneBy({ id });
            return res.status(200).json(currentUser);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.userInfo = userInfo;
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { newPassword } = req.body;
            const usersRepository = db_1.dbInstance.getRepository(users_entity_1.default);
            const user = yield usersRepository.findOneBy({ id });
            const saltRounds = 10;
            const salt = yield bcrypt.genSalt(saltRounds);
            user.password = yield bcrypt.hash(newPassword, salt);
            yield usersRepository.save(user);
            return res.status(200).json(user);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.changePassword = changePassword;
function deleteAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const usersRepository = db_1.dbInstance.getRepository(users_entity_1.default);
            const favouritesRepository = db_1.dbInstance.getRepository(favourites_entity_1.default);
            const user = yield usersRepository.findOneBy({ id });
            yield favouritesRepository.delete({ userId: id });
            yield usersRepository.delete(user);
            return res.status(200).json();
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=auth.service.js.map