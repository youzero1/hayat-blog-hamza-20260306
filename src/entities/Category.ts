import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany('Post', 'category')
  posts!: any[];

  @OneToMany('Product', 'category')
  products!: any[];
}
