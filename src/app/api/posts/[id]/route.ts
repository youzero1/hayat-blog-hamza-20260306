import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import { Category } from '@/entities/Category';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);

    const post = await postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.comments', 'comments')
      .where('post.id = :id', { id: parseInt(params.id, 10) })
      .orderBy('comments.createdAt', 'DESC')
      .getOne();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
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
    const categoryRepo = ds.getRepository(Category);

    const post = await postRepo.findOne({
      where: { id: parseInt(params.id, 10) },
      relations: ['category'],
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, content, excerpt, coverImage, author, categoryId, isFeatured, isPublished } = body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (author) post.author = author;
    if (isFeatured !== undefined) post.isFeatured = isFeatured;
    if (isPublished !== undefined) post.isPublished = isPublished;

    if (categoryId !== undefined) {
      if (categoryId === null) {
        post.category = null;
      } else {
        const category = await categoryRepo.findOne({ where: { id: categoryId } });
        if (category) post.category = category;
      }
    }

    const updated = await postRepo.save(post);
    return NextResponse.json(updated);
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

    const post = await postRepo.findOne({
      where: { id: parseInt(params.id, 10) },
    });

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
