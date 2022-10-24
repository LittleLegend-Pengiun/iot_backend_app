import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    age: number;
}