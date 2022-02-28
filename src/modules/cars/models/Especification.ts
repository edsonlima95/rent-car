import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("especifications")
class Especification {

    @PrimaryGeneratedColumn("increment")
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string;
    

    @CreateDateColumn()
    createdAt: Date;
   
}


export {Especification}