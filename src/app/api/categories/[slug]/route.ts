import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Category } from '@/entities/Category';
import { Post } from '@/entities/Post';
import { Product } from '@/entities/Product';

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(Category);
    const postRepo = ds.getRepository(Post);
    const productRepo = ds.getRepository(Product);

    const category = await categoryRepo.findOne({ where: { slug: params.slug } });
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const posts = await postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .where('post.categoryId = :id', { id: category.id })
      .andWhere('post.isPublished = :published', { published: true })
      .orderBy('post.createdAt', 'DESC')
      .getMany();

    const products = await productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.categoryId = :id', { id: category.id })
      .andWhere('product.isActive = :active', { active: true })
      .orderBy('product.createdAt', 'DESC')
      .getMany();

    return NextResponse.json({ category, posts, products });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}
