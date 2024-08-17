import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ type: 'timestamp without time zone' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone', nullable: true })
    updated_at: Date;

}
