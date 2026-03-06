import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import type { Post } from './Post';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ nullable: true, type: 'text' })
  description!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany('Post', 'category')
  posts!: Post[];
}
