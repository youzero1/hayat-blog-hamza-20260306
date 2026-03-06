import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import slugify from 'slugify';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, categoryId, isPublished, featuredImage } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);

    let slug = slugify(title, { lower: true, strict: true });
    const existing = await postRepo.findOne({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const post = postRepo.create({
      title,
      slug,
      content,
      excerpt: excerpt || null,
      featuredImage: featuredImage || null,
      categoryId: categoryId ? parseInt(categoryId) : null,
      isPublished: isPublished || false,
      publishedAt: isPublished ? new Date() : null,
    });

    const saved = await postRepo.save(post);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
