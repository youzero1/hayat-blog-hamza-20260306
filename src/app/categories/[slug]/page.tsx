import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDataSource } from '@/lib/database';
import { Category } from '@/entities/Category';
import { Post } from '@/entities/Post';
import BlogCard from '@/components/BlogCard';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const ds = await getDataSource();
  const categoryRepo = ds.getRepository(Category);
  const postRepo = ds.getRepository(Post);

  const category = await categoryRepo.findOne({ where: { slug: params.slug } });

  if (!category) {
    notFound();
  }

  const posts = await postRepo.find({
    where: { isPublished: true, categoryId: category.id },
    relations: ['category'],
    order: { publishedAt: 'DESC' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-warm-500 mb-8">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-primary-600">Categories</Link>
        <span>/</span>
        <span className="text-warm-800">{category.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-warm-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          {category.name}
        </h1>
        {category.description && (
          <p className="text-warm-600 text-lg">{category.description}</p>
        )}
        <p className="text-warm-500 mt-2">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-warm-700 mb-2">No posts in this category yet</h3>
          <p className="text-warm-500">Check back soon!</p>
        </div>
      )}
    </div>
  );
}
