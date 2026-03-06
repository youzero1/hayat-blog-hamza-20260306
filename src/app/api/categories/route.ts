import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Category } from '@/entities/Category';
import { Post } from '@/entities/Post';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(Category);
    const postRepo = ds.getRepository(Post);

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const category = await categoryRepo.findOne({ where: { slug } });
      if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      const postCount = await postRepo.count({ where: { categoryId: category.id, published: true } });
      return NextResponse.json({ data: { ...category, postCount } });
    }

    const categories = await categoryRepo.find({ order: { name: 'ASC' } });

    // Add post counts
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const postCount = await postRepo.count({ where: { categoryId: cat.id, published: true } });
        return { ...cat, postCount };
      })
    );

    return NextResponse.json({ data: categoriesWithCount });
  } catch (error) {
    console.error('GET /api/categories error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(Category);

    const body = await request.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'name and slug are required' }, { status: 400 });
    }

    const existing = await categoryRepo.findOne({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Category with this slug already exists' }, { status: 409 });
    }

    const category = categoryRepo.create({ name, slug, description });
    const saved = await categoryRepo.save(category);

    return NextResponse.json({ data: saved }, { status: 201 });
  } catch (error) {
    console.error('POST /api/categories error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
