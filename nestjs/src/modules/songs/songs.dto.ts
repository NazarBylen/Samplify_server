export class SongsDto {
    id: number;
    name: string;
    artistId: number;
    file: string;
}

export class SongsByArtistDto {
    meta: {
        per_page: number;
        total: any;
        pages: number;
        last_page: boolean;
        page: number
    };
    data: any;
}
