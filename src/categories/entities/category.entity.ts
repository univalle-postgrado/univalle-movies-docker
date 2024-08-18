import { Movie } from "src/movies/entities/movie.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('categories')
@Unique(['title'])
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    title: string;

    @Column({ length: 180, nullable: true })
    description: string;

    @Column({ default: false })
    enabled: boolean;

    @CreateDateColumn({ type: 'timestamp without time zone', select: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone', select: false, nullable: true })
    updated_at: Date;

    @OneToMany(() => Movie, movie => movie.category)
    movies: Movie[]
}
