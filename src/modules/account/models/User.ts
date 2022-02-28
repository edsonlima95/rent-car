import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";

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

    @Expose({ name: "avatar_url" })
    avatar_url(): string {
        switch (process.env.DISK_STORAGE) { 
            
        case "local":   
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
        case "s3":
            return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
        default:
            return null;
        }
    }

}

export { User }