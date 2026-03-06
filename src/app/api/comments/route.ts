import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Comment } from '@/entities/Comment';
import { Post } from '@/entities/Post';

export async function POST(request: NextRequest) {
  try {
    const ds = await getDataSource();
    const commentRepo = ds.getRepository(Comment);
    const postRepo = ds.getRepository(Post);

    const body = await request.json();
    const { postId, authorName, email, content } = body;

    if (!postId || !authorName || !email || !content) {
      return NextResponse.json(
        { error: 'postId, authorName, email, and content are required' },
        { status: 400 }
      );
    }

    const post = await postRepo.findOne({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const comment = commentRepo.create({
      authorName,
      email,
      content,
      post,
    });

    const saved = await commentRepo.save(comment);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('POST /api/comments error:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
