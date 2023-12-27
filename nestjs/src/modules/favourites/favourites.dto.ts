export class FavouritesDto {
    id: number;
    userId: number;
    songId: number;
}

export class AddFavouritesDto {
    userId: string;
    songId: number;
}
