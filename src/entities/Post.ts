import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text', nullable: true })
  excerpt!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  coverImage!: string;

  @Column({ type: 'varchar', length: 100, default: 'Admin' })
  author!: string;

  @Column({ type: 'boolean', default: true })
  isPublished!: boolean;

  @Column({ type: 'boolean', default: false })
  isFeatured!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne('Category', 'posts', { nullable: true, eager: false })
  @JoinColumn({ name: 'categoryId' })
  category!: any;

  @Column({ type: 'integer', nullable: true })
  categoryId!: number;
}
