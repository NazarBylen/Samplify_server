import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from "./users.entity"
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./auth.controller";
import { Favourites } from "../favourites/favourites.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Users, Favourites])],
    controllers: [UsersController],
    providers: [AuthService],
})
export class AuthModule {}
