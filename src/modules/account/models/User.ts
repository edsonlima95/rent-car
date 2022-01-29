import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
class User {

    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    drive_license: string;
    @Column()
    avatar: string;
    @Column()
    admin: boolean;
    @CreateDateColumn()
    createdAt: Date;

}

export { User }