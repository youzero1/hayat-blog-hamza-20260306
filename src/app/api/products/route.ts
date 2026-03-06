import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, affiliateLink, categoryId, isFeatured } = body;

    if (!name || !description || price === undefined) {
      return NextResponse.json({ error: 'Name, description, and price are required' }, { status: 400 });
    }

    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);

    const product = productRepo.create({
      name,
      description,
      price: parseFloat(price),
      imageUrl: imageUrl || null,
      affiliateLink: affiliateLink || null,
      categoryId: categoryId ? parseInt(categoryId) : null,
      isFeatured: isFeatured || false,
    });

    const saved = await productRepo.save(product);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
