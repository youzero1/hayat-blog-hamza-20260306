import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get('limit') || '100');
    const category = searchParams.get('category') || '';

    const qb = productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.isActive = :active', { active: true });

    if (category) {
      qb.andWhere('category.slug = :slug', { slug: category });
    }

    const products = await qb
      .orderBy('product.createdAt', 'DESC')
      .take(limit)
      .getMany();

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);
    const body = await request.json();

    const product = productRepo.create(body);
    await productRepo.save(product);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
