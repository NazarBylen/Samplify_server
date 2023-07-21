import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Users {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({
    type: "text",
    nullable: true,
  })
  public accessToken: string;

  @Column({
    type: "text",
    nullable: true,
  })
  public refreshToken: string;
}

export default Users;
