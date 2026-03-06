import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import slugify from 'slugify';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, content, excerpt, categoryId, isPublished, featuredImage } = body;

    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);

    const post = await postRepo.findOne({ where: { id: parseInt(params.id) } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (title && title !== post.title) {
      let slug = slugify(title, { lower: true, strict: true });
      const existing = await postRepo.findOne({ where: { slug } });
      if (existing && existing.id !== post.id) {
        slug = `${slug}-${Date.now()}`;
      }
      post.slug = slug;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt !== undefined ? excerpt : post.excerpt;
    post.featuredImage = featuredImage !== undefined ? featuredImage : post.featuredImage;
    post.categoryId = categoryId ? parseInt(categoryId) : null;
    const wasPublished = post.isPublished;
    post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;
    if (!wasPublished && post.isPublished) {
      post.publishedAt = new Date();
    }

    const saved = await postRepo.save(post);
    return NextResponse.json(saved);
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);

    const post = await postRepo.findOne({ where: { id: parseInt(params.id) } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await postRepo.remove(post);
    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
