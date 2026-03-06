export interface PostType {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnailUrl: string;
  readTime: number;
  views: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  category?: CategoryType;
  author?: AuthorType;
  categoryId?: number;
  authorId?: number;
}

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount?: number;
}

export interface AuthorType {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
