import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import { Category } from '@/entities/Category';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100);
}

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const featured = searchParams.get('featured') === 'true';
    const showAll = searchParams.get('all') === 'true';

    const skip = (page - 1) * limit;

    const qb = postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .orderBy('post.createdAt', 'DESC');

    if (!showAll) {
      qb.where('post.isPublished = :published', { published: true });
    }

    if (featured) {
      qb.andWhere('post.isFeatured = :featured', { featured: true });
    }

    if (search) {
      qb.andWhere(
        '(post.title LIKE :search OR post.excerpt LIKE :search OR post.content LIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (category) {
      qb.andWhere('category.slug = :slug', { slug: category });
    }

    const [posts, total] = await qb.skip(skip).take(limit).getManyAndCount();

    return NextResponse.json({
      data: posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);
    const categoryRepo = ds.getRepository(Category);

    const body = await request.json();
    const { title, content, excerpt, coverImage, author, categoryId, isFeatured, isPublished } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    let slug = generateSlug(title);
    const existingPost = await postRepo.findOne({ where: { slug } });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    const post = postRepo.create({
      title,
      slug,
      content,
      excerpt: excerpt || '',
      coverImage: coverImage || null,
      author,
      isFeatured: isFeatured || false,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    if (categoryId) {
      const category = await categoryRepo.findOne({ where: { id: categoryId } });
      if (category) post.category = category;
    }

    const saved = await postRepo.save(post);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
