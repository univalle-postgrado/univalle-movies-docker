import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    title: string;

    @Column({ type: 'text' })
    synopsis: string;

    @Column({ length: 60 })
    director: string;

    @Column({ name: 'release_date', type: 'date' })
    releaseDate: Date;

    @Column({ name: 'poster_url', length: 255 })
    posterUrl: string;

    @Column({ type: 'decimal', precision: 3, scale: 1 })
    rating: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone', select: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone', select: false, nullable: true })
    updatedAt: Date;

    @Column({ name: 'category_id', type: 'integer' })
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
    category: Category;
}
