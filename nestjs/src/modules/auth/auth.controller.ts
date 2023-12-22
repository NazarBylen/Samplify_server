import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class UsersController {
    constructor(private userService: AuthService) {}

    @Post("/sign-up")
    async createUser(@Body() userData) {
        return await this.userService.signUp(userData);
    }

    @Post("/login")
    async loginUser(@Body() userData) {
        return await this.userService.logIn(userData);
    }

    @Get("/:id")
    async getUserInfo(@Param('id') id: number) {
        return await this.userService.userInfo(id);
    }

    @Patch("/change-password/:id")
    async changeUserPassword(@Param('id') id: number, @Body('newPassword') newPassword: string) {
        return await this.userService.changePassword(id, newPassword);
    }

    @Delete("/delete/:id")
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }
}

