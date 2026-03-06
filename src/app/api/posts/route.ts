import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const categoryId = searchParams.get('category_id') || '';
    const featured = searchParams.get('featured') === 'true';
    const offset = (page - 1) * limit;

    const qb = postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .where('post.isPublished = :published', { published: true });

    if (featured) {
      qb.andWhere('post.isFeatured = :featured', { featured: true });
    }

    if (search) {
      qb.andWhere('(post.title LIKE :search OR post.excerpt LIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (category) {
      qb.andWhere('category.slug = :slug', { slug: category });
    }

    if (categoryId) {
      qb.andWhere('post.categoryId = :categoryId', { categoryId: parseInt(categoryId) });
    }

    const total = await qb.getCount();
    const posts = await qb
      .orderBy('post.createdAt', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    return NextResponse.json({
      posts,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);
    const body = await request.json();

    const post = postRepo.create(body);
    await postRepo.save(post);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
