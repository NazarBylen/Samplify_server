import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import ArtistsEntity from "../artists/artists.entity";

@Entity('songs')
export class Songs {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({ name: 'artist_id' })
    artistId: number;

    @Column({
        type: "text",
        nullable: true
    })
    file: string;

    @ManyToOne(type => ArtistsEntity, (artists) => artists.songs, )
    @JoinColumn({name: "artist_id"})
    artist: ArtistsEntity;

}

export default Songs;