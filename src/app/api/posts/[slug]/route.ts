import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);

    const post = await postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .where('post.slug = :slug', { slug: params.slug })
      .andWhere('post.isPublished = :published', { published: true })
      .getOne();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);
    const body = await request.json();

    const post = await postRepo.findOne({ where: { slug: params.slug } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    Object.assign(post, body);
    await postRepo.save(post);

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const ds = await getDataSource();
    const postRepo = ds.getRepository(Post);

    const post = await postRepo.findOne({ where: { slug: params.slug } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await postRepo.remove(post);
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
