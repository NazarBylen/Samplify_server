import * as bcrypt from 'bcrypt';

import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { response } from "express";

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
        return response.status(201);
    }
}
