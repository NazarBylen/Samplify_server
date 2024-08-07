import * as bcrypt from 'bcrypt';

import { HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { Favourites } from '../favourites/favourites.entity';
import { generateAccessToken, generateRefreshToken, isTokenExpired } from "../../../utils/jwt";
import { UserDataDto } from "./auth.dto"

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(Favourites)
        private favouritesRepository: Repository<Favourites>
    ) {
    }

    async signUp(userData: UserDataDto) {
        try {
            const { email, password } = userData;

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);

            const user = await this.userRepository.findOneBy({ email })
            if (user) throw { message: "User already exists", status: 404 }

            const newUser = this.userRepository.create({
                email: email,
                password: hash,
            })

            await this.userRepository.save(newUser)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    async logIn(userData: UserDataDto) {
        try {
            const { email, password } = userData;

            const user = await this.userRepository.findOneBy({ email })
            if (!user) throw { message: "User does not exist", status: 404 }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) throw { message: "Wrong username or password", status: 404 }

            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)

            user.accessToken = accessToken;
            user.refreshToken = refreshToken;

            const id = user.id

            await this.userRepository.save(user)


            return {
                id,
                email,
                accessToken,
                refreshToken
            }
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, error.status);
        }
    }

    async userInfo(id: number) {
        const currentUser = await this.userRepository.findOneBy({ id })

        return {
            currentUser
        }
    }

    async changePassword(id: number, newPassword: string) {
        const user = await this.userRepository.findOneBy({ id })

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        user.password = await bcrypt.hash(newPassword, salt)

        await this.userRepository.save(user)
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findOneBy({ id })

        await this.favouritesRepository.delete({ userId: id });
        await this.userRepository.delete(user)
    }

    async refreshTokens(userId: number, passedRefreshToken: string, expDate:string) {
        try {
            console.log(expDate);
            if (isTokenExpired(expDate)) throw new UnauthorizedException(HttpStatus.PROXY_AUTHENTICATION_REQUIRED);

            const user = await this.userRepository.findOneBy({id: userId})
            if (!user) throw { message: "User does not exist", status: 404 }

            if(user.refreshToken===passedRefreshToken) {
                console.log("token valid")
                const accessToken = generateAccessToken(user)
                const refreshToken = generateRefreshToken(user)

                user.accessToken = accessToken;
                user.refreshToken = refreshToken;

                await this.userRepository.save(user)

                return {
                    refreshToken: user.refreshToken,
                    accessToken: user.accessToken,
                }
            }
            else {
                throw { message: "Invalid refresh token", status: 401 };
            }
        } catch(error) {
            console.log(error);
            throw new HttpException(error.message, HttpStatus.PROXY_AUTHENTICATION_REQUIRED);
        }
}
}
