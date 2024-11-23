import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text', default: ''})
    user!: string;

    @Column({type: 'text', default: ''})
    email!: string;
}