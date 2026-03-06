import BlogCard from './BlogCard';

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  createdAt: string;
  isFeatured: boolean;
  category?: { name: string; slug: string };
}

interface FeaturedPostsProps {
  posts: Post[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="py-16 px-4">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Stories</h2>
          <p className="section-subtitle">Our editors' top picks</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
