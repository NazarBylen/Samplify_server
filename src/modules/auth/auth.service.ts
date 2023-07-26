import * as bcrypt from 'bcrypt';

import {dbInstance} from '../../services/db';
import {generateRefreshToken, generateAccessToken} from '../../utils/jwt';
import Users from './users.entity';

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
        return next(error)
    }
}
