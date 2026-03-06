import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, affiliateLink, categoryId, isFeatured } = body;

    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);

    const product = await productRepo.findOne({ where: { id: parseInt(params.id) } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? parseFloat(price) : product.price;
    product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;
    product.affiliateLink = affiliateLink !== undefined ? affiliateLink : product.affiliateLink;
    product.categoryId = categoryId ? parseInt(categoryId) : null;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;

    const saved = await productRepo.save(product);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);

    const product = await productRepo.findOne({ where: { id: parseInt(params.id) } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await productRepo.remove(product);
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
