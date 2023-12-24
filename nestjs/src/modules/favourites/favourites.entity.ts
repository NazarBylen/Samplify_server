import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import SongsEntity from "../songs/songs.entity";
import UsersEntity from "../auth/users.entity";

@Entity('favourites')
export class Favourites {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'song_id' })
    songId: number;

    @ManyToOne(type => UsersEntity, (user) => user.id, )
    @JoinColumn({name: "user_id"})
    user: UsersEntity;

    @ManyToOne(type => SongsEntity, (songs) => songs.id, )
    @JoinColumn({name: "song_id"})
    song: SongsEntity;

}

export default Favourites;
