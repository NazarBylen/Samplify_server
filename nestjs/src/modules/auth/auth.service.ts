import * as bcrypt from 'bcrypt';

import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) {}

    async signUp(userData) {
        const { email, password } = userData;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const newUser = this.userRepository.create({
            email: email,
            password: hash,
        })

        await this.userRepository.save(newUser)
    }

    async logIn(userData){
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
        await this.userRepository.delete(user)
    }
}
