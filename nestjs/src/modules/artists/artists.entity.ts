import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Repository } from 'typeorm';
import SongsEntity from "../songs/songs.entity";

@Entity('artists')
export class Artists {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public name: string;

    @Column({
        type: "text",
        nullable: true,
    })
    public description: string;

    @Column()
    public slug: string;

    @Column()
    public image: string;

    @OneToMany(() => SongsEntity, (songs) => songs.artist, )
    songs: SongsEntity[]
}

export default Artists;
