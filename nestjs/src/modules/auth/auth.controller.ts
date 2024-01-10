import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, UserDataDto } from "./auth.dto"
import { FavouritesDto } from "../favourites/favourites.dto";
import { decodeRefreshToken, decodeToken } from "../../../utils/jwt";

@Controller('auth')
export class UsersController {
    constructor(private userService: AuthService) {}

    @Post("/sign-up")
    async createUser(@Body() userData: UserDataDto) {
        return await this.userService.signUp(userData);
    }

    @Post("/login")
    async loginUser(@Body() userData: UserDataDto) {
        return await this.userService.logIn(userData);
    }

    @Get("/profile/:id")
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

    @Post("/refresh-token")
    async refreshToken(@Req() req: Request, @Body('refresh-token') refreshToken: string) {
        const parsedRefreshToken = JSON.parse(refreshToken)
        const decodedToken = await decodeRefreshToken(parsedRefreshToken)
        const userId = decodedToken['userId']
        return await this.userService.refreshTokens(Number(userId), parsedRefreshToken);
    }
}

