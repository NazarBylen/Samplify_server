export class AuthDto {
    id: number;
    email: string;
    password: string;
    accessToken: string;
    refreshToken: string;
}

export class UserDataDto {
    email: string;
    password: string;
}
