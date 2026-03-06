import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import { Category } from '@/entities/Category';
import { Author } from '@/entities/Author';

export async function GET(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const slug = searchParams.get('slug');

    const qb = postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.author', 'author');

    if (slug) {
      qb.andWhere('post.slug = :slug', { slug });
    }

    if (published === 'true') {
      qb.andWhere('post.published = :pub', { pub: 1 });
    } else if (published === 'false') {
      qb.andWhere('post.published = :pub', { pub: 0 });
    }

    if (category) {
      qb.andWhere('category.slug = :catSlug', { catSlug: category });
    }

    if (categoryId) {
      qb.andWhere('post.categoryId = :categoryId', { categoryId: parseInt(categoryId) });
    }

    if (search) {
      qb.andWhere(
        '(post.title LIKE :search OR post.excerpt LIKE :search)',
        { search: `%${search}%` }
      );
    }

    switch (sort) {
      case 'oldest':
        qb.orderBy('post.createdAt', 'ASC');
        break;
      case 'popular':
        qb.orderBy('post.views', 'DESC');
        break;
      default:
        qb.orderBy('post.createdAt', 'DESC');
    }

    const total = await qb.getCount();
    const posts = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

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
    const authorRepo = ds.getRepository(Author);

    const body = await request.json();
    const { title, slug, content, excerpt, thumbnailUrl, readTime, categoryId, authorId, published } = body;

    if (!title || !slug || !content || !excerpt) {
      return NextResponse.json(
        { error: 'title, slug, content, and excerpt are required' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await postRepo.findOne({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    const post = postRepo.create({
      title,
      slug,
      content,
      excerpt,
      thumbnailUrl: thumbnailUrl || `https://picsum.photos/seed/${slug}/800/500`,
      readTime: readTime || 5,
      published: published || false,
      views: 0,
    });

    if (categoryId) {
      const cat = await categoryRepo.findOne({ where: { id: categoryId } });
      if (cat) post.categoryId = cat.id;
    }

    if (authorId) {
      const author = await authorRepo.findOne({ where: { id: authorId } });
      if (author) post.authorId = author.id;
    }

    const saved = await postRepo.save(post);

    // Return with relations
    const full = await postRepo.findOne({
      where: { id: saved.id },
      relations: ['category', 'author'],
    });

    return NextResponse.json({ data: full }, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
