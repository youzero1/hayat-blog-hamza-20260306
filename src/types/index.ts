export interface PostType {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  author: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  category?: CategoryType;
  comments?: CommentType[];
}

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  postCount?: number;
}

export interface CommentType {
  id: number;
  authorName: string;
  email: string;
  content: string;
  createdAt: string;
  post?: PostType;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  message?: string;
}
