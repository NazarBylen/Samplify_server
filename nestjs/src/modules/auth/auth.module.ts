import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from "./users.entity"
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./auth.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [AuthService],
})
export class AuthModule {}
