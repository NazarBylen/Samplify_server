import * as bcrypt from 'bcrypt';

import {dbInstance} from '../../services/db';
import {generateAccessToken, generateRefreshToken} from '../../utils/jwt';
import Users from './users.entity';
import Favourites from "../favourites/favourites.entity";

export async function signUp(req, res, next) {
    try {
        const {email, password} = req.body
        const usersRepository = dbInstance.getRepository(Users)
        const users = new Users()

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        users.email = email
        users.password = hash
        await usersRepository.save(users)
        return res.status(201).json();
    } catch (error) {
        return next(error)
    }
}

export async function logIn(req, res, next) {
    try {
        const {email, password} = req.body;
        const usersRepository = dbInstance.getRepository(Users)

        const user = await usersRepository.findOneBy({ email })
        if (!user) throw { message: "User does not exist", status: 404 }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) throw { message: "Wrong username or password", status: 401 }

        const accessToken = generateAccessToken ({email})
        const refreshToken = generateRefreshToken ({email})

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        const id = user.id

        await usersRepository.save(user)

        return res.status(200).json({id, email, accessToken, refreshToken});
    } catch (error) {
        error.statusCode=404
        return next(error)
    }
}

export async function userInfo(req, res, next) {
    try {

        const {id} = req.params
        const usersRepository = dbInstance.getRepository(Users)

        const currentUser = await usersRepository.findOneBy({ id })

        return res.status(200).json(currentUser);
    } catch (error) {
        return next(error)
    }
}

export async function changePassword(req, res, next) {
    try {

        const {id} = req.params
        const {newPassword} = req.body

        const usersRepository = dbInstance.getRepository(Users)
        const user = await usersRepository.findOneBy({ id })

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        user.password = await bcrypt.hash(newPassword, salt)

        await usersRepository.save(user)

        return res.status(200).json(user);
    } catch (error) {
        return next(error)
    }
}

export async function deleteAccount(req, res, next) {
    try {

        const {id} = req.params

        const usersRepository = dbInstance.getRepository(Users)
        const favouritesRepository = dbInstance.getRepository(Favourites)

        const user = await usersRepository.findOneBy({ id })


        await favouritesRepository.delete({ userId: id });
        await usersRepository.delete(user)

        return res.status(200).json();
    } catch (error) {
        return next(error)
    }
}