import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {User} from "./User";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.tasks)
    user: User;

}
