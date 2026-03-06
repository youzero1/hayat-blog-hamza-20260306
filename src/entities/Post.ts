import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import type { Category } from './Category';
import type { Tag } from './Tag';

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

  @Column({ type: 'text', nullable: true })
  excerpt!: string | null;

  @Column({ nullable: true })
  featuredImage!: string | null;

  @Column({ default: false })
  isPublished!: boolean;

  @Column({ nullable: true, type: 'datetime' })
  publishedAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne('Category', 'posts', { nullable: true, eager: false })
  category!: Category | null;

  @Column({ nullable: true })
  categoryId!: number | null;

  @ManyToMany('Tag', 'posts', { eager: false })
  @JoinTable({
    name: 'post_tags',
    joinColumn: { name: 'postId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags!: Tag[];
}
