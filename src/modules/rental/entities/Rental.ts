import { User } from "@modules/account/entities/User";
import { Car } from "@modules/cars/models/Car";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("rentals")
class Rental {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @OneToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car

    @Column()
    car_id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: number

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}

export { Rental }