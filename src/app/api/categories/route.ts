import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Category } from '@/entities/Category';

export async function GET() {
  try {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(Category);

    const categories = await categoryRepo
      .createQueryBuilder('category')
      .loadRelationCountAndMap('category.postCount', 'category.posts', 'post', (qb) =>
        qb.where('post.isPublished = :pub', { pub: true })
      )
      .loadRelationCountAndMap('category.productCount', 'category.products', 'product', (qb) =>
        qb.where('product.isActive = :active', { active: true })
      )
      .orderBy('category.name', 'ASC')
      .getMany();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(Category);
    const body = await request.json();

    const category = categoryRepo.create(body);
    await categoryRepo.save(category);

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
