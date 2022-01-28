import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Especification } from "./Especification";

@Entity("cars")
class Car {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    description?: string;

    @Column()
    daily_rate: number;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand?: string;

    @Column({default: true})
    available: boolean;

    // Relacionamento Muitos par um ManyToOne.
    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category?: Category;

    @Column()
    category_id?: number

    // Relacionamento Muitos para sMuitos
    @ManyToMany(() => Especification)
    @JoinTable({
        name: "especification_cars",
        joinColumns: [{ name: "car_id" }],
        inverseJoinColumns: [{ name: "especification_id" }]
    })
    especifications: Especification[]

    @CreateDateColumn()
    createdAt: Date
}

export { Car }