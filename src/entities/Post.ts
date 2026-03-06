import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  title!: string;

  @Column({ unique: true, nullable: false })
  slug!: string;

  @Column({ type: 'text', nullable: false })
  content!: string;

  @Column({ length: 300, nullable: true })
  excerpt!: string;

  @Column({ nullable: true })
  coverImage!: string;

  @Column({ nullable: false })
  author!: string;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ default: true })
  isPublished!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne('Category', 'posts', { nullable: true, eager: false })
  @JoinColumn({ name: 'categoryId' })
  category!: any;

  @Column({ nullable: true })
  categoryId!: number;

  @OneToMany('Comment', 'post')
  comments!: any[];
}
