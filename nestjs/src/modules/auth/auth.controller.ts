import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class UsersController {
    constructor(private userService: AuthService) {}

    @Post("/sign-up")
    async createUser(@Body() userData) {
        return await this.userService.signUp(userData);
    }

}

