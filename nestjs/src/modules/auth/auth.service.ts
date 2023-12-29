import * as bcrypt from 'bcrypt';

import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { Favourites } from '../favourites/favourites.entity';
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { UserDataDto } from "./auth.dto"
import e from "express";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(Favourites)
        private favouritesRepository: Repository<Favourites>
    ) {}

    async signUp(userData: UserDataDto) {
        try {
            const { email, password } = userData;

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);

            const user = await this.userRepository.findOneBy({email})
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

    async logIn(userData: UserDataDto){
        try {
            const { email, password } = userData;

            const user = await this.userRepository.findOneBy({email})
            if (!user) throw { message: "User does not exist", status: 404 }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) throw { message: "Wrong username or password", status: 401 }

            const accessToken = generateAccessToken ({email})
            const refreshToken = generateRefreshToken ({email})

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
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    async userInfo(id: number){
        const currentUser = await this.userRepository.findOneBy({ id })

        return {
            currentUser
        }
    }

    async changePassword(id: number, newPassword: string){
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

    async refreshToken(id: number, refreshToken: string) {
        try {

            console.log(id);
            console.log(refreshToken);
            const errorMessage = { message: "Something went wrong", status: 404 };

            const user = await this.userRepository.findOneBy({ id })
            if (!user) throw errorMessage

            if (user.refreshToken === refreshToken) {
                return;
            }
            else {
                throw { message: "Something went wrong", status: 404 }
            }

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
