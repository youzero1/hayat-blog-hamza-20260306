import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import type { Post } from './Post';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @ManyToMany('Post', 'tags')
  posts!: Post[];
}
