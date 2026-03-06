import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore all our blog posts on lifestyle, health, travel, food, and technology.',
};

async function getPosts(page: number, search: string, category: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const params = new URLSearchParams({
      page: page.toString(),
      limit: '9',
      ...(search && { search }),
      ...(category && { category }),
    });
    const res = await fetch(`${baseUrl}/api/posts?${params}`, { cache: 'no-store' });
    if (!res.ok) return { posts: [], total: 0, pages: 1 };
    return res.json();
  } catch {
    return { posts: [], total: 0, pages: 1 };
  }
}

async function getCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch {
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; category?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search || '';
  const category = searchParams.category || '';

  const [{ posts, total, pages }, categories] = await Promise.all([
    getPosts(page, search, category),
    getCategories(),
  ]);

  return (
    <div className="py-12 px-4">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest-800 mb-4">
            The Blog
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            Stories, tips, and insights to help you live better.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <SearchBar defaultValue={search} />
          <CategoryFilter categories={categories} selected={category} />
        </div>

        {/* Results Info */}
        {search || category ? (
          <p className="text-gray-500 mb-6">
            Showing {total} result{total !== 1 ? 's' : ''}
            {search && <> for <span className="font-medium text-forest-700">"{search}"</span></>}
            {category && (
              <> in <span className="font-medium text-forest-700">{categories.find((c: any) => c.slug === category)?.name || category}</span></>
            )}
          </p>
        ) : null}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={pages} />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-serif font-bold text-forest-700 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
