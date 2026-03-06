import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Category } from '@/entities/Category';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100);
}

export async function GET() {
  try {
    const ds = await getDataSource();
    const categoryRepo = ds.getRepository(Category);

    const categories = await categoryRepo
      .createQueryBuilder('category')
      .loadRelationCountAndMap('category.postCount', 'category.posts', 'post', (qb) =>
        qb.where('post.isPublished = :published', { published: true })
      )
      .orderBy('category.name', 'ASC')
      .getMany();

    return NextResponse.json(categories);
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
    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const slug = generateSlug(name);
    const existing = await categoryRepo.findOne({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Category with this name already exists' }, { status: 409 });
    }

    const category = categoryRepo.create({ name, slug, description: description || null });
    const saved = await categoryRepo.save(category);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('POST /api/categories error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
