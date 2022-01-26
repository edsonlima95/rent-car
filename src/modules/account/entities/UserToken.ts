import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity("user_tokens")
class UserToken {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column()
    user_id: number;

    @Column()
    refresh_token: string;

    @Column()
    expires_date: Date

    @CreateDateColumn()
    createdAt: Date

}

export { UserToken }