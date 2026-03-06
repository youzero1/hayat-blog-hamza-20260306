import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Product } from '@/entities/Product';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);

    const product = await productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id: parseInt(params.id) })
      .andWhere('product.isActive = :active', { active: true })
      .getOne();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);
    const body = await request.json();

    const product = await productRepo.findOne({ where: { id: parseInt(params.id) } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    Object.assign(product, body);
    await productRepo.save(product);

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const productRepo = ds.getRepository(Product);

    const product = await productRepo.findOne({ where: { id: parseInt(params.id) } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await productRepo.remove(product);
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
