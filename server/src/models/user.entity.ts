import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcryptjs';

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
    @BeforeInsert()
    async hashPassword() {
       this.password = await bcrypt.hash(this.password, Number(process.env.HASH_SALT));
    }

    @Column()
    age: number;
}