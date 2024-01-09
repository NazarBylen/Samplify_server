import * as jwt from "jsonwebtoken";
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from "@nestjs/common";

export function generateAccessToken(user) {
  return jwt.sign({userId: user.id}, 'ACCESS_TOKEN_SECRET', {expiresIn: "1m"})
}

export function generateRefreshToken(user) {
  return jwt.sign({userId: user.id}, 'REFRESH_TOKEN_SECRET', { expiresIn: "120m" })
}

export async function decodeToken(token) {
    const jwtService = new JwtService();

    try {
    return await jwtService.verify(
        token,
        {
            secret: "ACCESS_TOKEN_SECRET"
        },
    )
    } catch {
        throw new UnauthorizedException();
    }
}

export async function decodeRefreshToken(token) {
    const jwtService = new JwtService();

    try {
        return await jwtService.verify(
            token,
            {
                secret: "REFRESH_TOKEN_SECRET"
            },
        )
    } catch {
        throw new UnauthorizedException();
    }
}

export function isTokenExpired(exp) {
    return Date.now() > exp * 1000;
}
