import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category';
import { Author } from './Author';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text' })
  excerpt!: string;

  @Column({ nullable: true })
  thumbnailUrl!: string;

  @Column({ default: 5 })
  readTime!: number;

  @Column({ default: 0 })
  views!: number;

  @Column({ default: false })
  published!: boolean;

  @Column({ nullable: true })
  categoryId!: number;

  @Column({ nullable: true })
  authorId!: number;

  @ManyToOne(() => Category, { nullable: true, eager: false })
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @ManyToOne(() => Author, { nullable: true, eager: false })
  @JoinColumn({ name: 'authorId' })
  author!: Author;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
