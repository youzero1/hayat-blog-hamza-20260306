import Link from 'next/link';
import { getDataSource } from '@/lib/database';
import { Post } from '@/entities/Post';
import { Category } from '@/entities/Category';
import BlogCard from '@/components/BlogCard';
import SearchBar from '@/components/SearchBar';
import { Like } from 'typeorm';

export const dynamic = 'force-dynamic';

interface BlogPageProps {
  searchParams: { search?: string; category?: string; page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const ds = await getDataSource();
  const postRepo = ds.getRepository(Post);
  const categoryRepo = ds.getRepository(Category);

  const page = parseInt(searchParams.page || '1');
  const limit = 9;
  const offset = (page - 1) * limit;

  const search = searchParams.search || '';
  const categorySlug = searchParams.category || '';

  const queryBuilder = postRepo
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.category', 'category')
    .where('post.isPublished = :isPublished', { isPublished: true });

  if (search) {
    queryBuilder.andWhere(
      '(post.title LIKE :search OR post.content LIKE :search OR post.excerpt LIKE :search)',
      { search: `%${search}%` }
    );
  }

  if (categorySlug) {
    queryBuilder.andWhere('category.slug = :categorySlug', { categorySlug });
  }

  const total = await queryBuilder.getCount();
  const posts = await queryBuilder
    .orderBy('post.publishedAt', 'DESC')
    .skip(offset)
    .take(limit)
    .getMany();

  const totalPages = Math.ceil(total / limit);
  const categories = await categoryRepo.find({ order: { name: 'ASC' } });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-warm-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Blog
        </h1>
        <p className="text-warm-600 text-lg">Stories, guides, and inspiration for modern living</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar initialValue={search} />
        <div className="flex gap-2 flex-wrap">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !categorySlug
                ? 'bg-primary-600 text-white'
                : 'bg-warm-100 text-warm-700 hover:bg-primary-100 hover:text-primary-700'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}${search ? `&search=${search}` : ''}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categorySlug === cat.slug
                  ? 'bg-primary-600 text-white'
                  : 'bg-warm-100 text-warm-700 hover:bg-primary-100 hover:text-primary-700'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Results info */}
      {search && (
        <p className="text-warm-600 mb-6">
          {total} result{total !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
        </p>
      )}

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-warm-700 mb-2">No posts found</h3>
          <p className="text-warm-500">
            {search ? `Try a different search term.` : 'No posts available yet.'}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/blog?page=${p}${search ? `&search=${search}` : ''}${categorySlug ? `&category=${categorySlug}` : ''}`}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors ${
                p === page
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-warm-700 hover:bg-primary-100 border border-warm-200'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
