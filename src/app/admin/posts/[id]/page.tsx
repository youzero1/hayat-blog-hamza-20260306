import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostForm from '@/components/admin/PostForm';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import { Category } from '@/entities/Category';

export const dynamic = 'force-dynamic';

interface EditPostPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const ds = await getDataSource();
  const postRepo = ds.getRepository(Post);
  const categoryRepo = ds.getRepository(Category);

  const [post, categories] = await Promise.all([
    postRepo.findOne({ where: { id: parseInt(params.id) }, relations: ['category', 'tags'] }),
    categoryRepo.find({ order: { name: 'ASC' } }),
  ]);

  if (!post) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="text-warm-500 hover:text-warm-700">
          ← Back to Posts
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-warm-900 mb-8">Edit Post</h1>
      <PostForm categories={categories} post={post} />
    </div>
  );
}
