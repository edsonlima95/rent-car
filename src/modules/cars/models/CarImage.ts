import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./Car";


@Entity("car_images")
class CarImage {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    image_name: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car?: Car;

    @Column()
    car_id: number;
    
    @CreateDateColumn()
    createdAt: Date;

}

export {CarImage}