import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);
    const id = parseInt(params.id);

    const post = await postRepo.findOne({
      where: { id },
      relations: ['category', 'author'],
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Increment views
    await postRepo.update(id, { views: post.views + 1 });
    post.views += 1;

    return NextResponse.json({ data: post });
  } catch (error) {
    console.error('GET /api/posts/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);
    const id = parseInt(params.id);

    const post = await postRepo.findOne({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, slug, content, excerpt, thumbnailUrl, readTime, categoryId, published } = body;

    // Check slug uniqueness (excluding current post)
    if (slug && slug !== post.slug) {
      const existing = await postRepo.findOne({ where: { slug } });
      if (existing) {
        return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
      }
    }

    postRepo.merge(post, {
      title: title ?? post.title,
      slug: slug ?? post.slug,
      content: content ?? post.content,
      excerpt: excerpt ?? post.excerpt,
      thumbnailUrl: thumbnailUrl ?? post.thumbnailUrl,
      readTime: readTime ?? post.readTime,
      categoryId: categoryId ?? post.categoryId,
      published: published !== undefined ? published : post.published,
    });

    const updated = await postRepo.save(post);

    const full = await postRepo.findOne({
      where: { id: updated.id },
      relations: ['category', 'author'],
    });

    return NextResponse.json({ data: full });
  } catch (error) {
    console.error('PUT /api/posts/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);
    const id = parseInt(params.id);

    const post = await postRepo.findOne({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await postRepo.remove(post);
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/posts/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
