import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  authorName!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ type: 'text', nullable: false })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne('Post', 'comments', { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post!: any;

  @Column()
  postId!: number;
}
