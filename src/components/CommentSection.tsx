'use client';

import { useState } from 'react';
import { CommentType } from '@/types';

interface CommentSectionProps {
  postId: number;
  initialComments: CommentType[];
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [form, setForm] = useState({ authorName: '', email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, postId }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]);
        setForm({ authorName: '', email: '', content: '' });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to submit comment');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="border-b border-warm-200 pb-4 mb-8">
        <h2 className="text-2xl font-serif font-bold text-warm-900">
          Comments
          <span className="ml-2 text-base font-sans font-normal text-warm-400">({comments.length})</span>
        </h2>
      </div>

      {/* Comment List */}
      {comments.length > 0 ? (
        <div className="space-y-6 mb-10">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-warm-50 rounded-2xl p-5 border border-warm-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                  {comment.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-warm-800 text-sm">{comment.authorName}</p>
                  <p className="text-warm-400 text-xs">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <p className="text-warm-600 text-sm leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 mb-8 bg-warm-50 rounded-2xl border border-warm-200">
          <div className="text-4xl mb-2">💬</div>
          <p className="text-warm-500 text-sm">No comments yet. Be the first to comment!</p>
        </div>
      )}

      {/* Comment Form */}
      <div className="bg-white rounded-2xl border border-warm-200 p-6">
        <h3 className="text-lg font-bold text-warm-900 mb-5">Leave a Comment</h3>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm">
            ✅ Your comment has been posted successfully!
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-warm-700 mb-1.5">Name *</label>
              <input
                type="text"
                name="authorName"
                value={form.authorName}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full border border-warm-300 rounded-xl px-3.5 py-2.5 text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-warm-700 mb-1.5">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full border border-warm-300 rounded-xl px-3.5 py-2.5 text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-warm-700 mb-1.5">Comment *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Share your thoughts..."
              className="w-full border border-warm-300 rounded-xl px-3.5 py-2.5 text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-md"
          >
            {submitting ? 'Submitting...' : 'Post Comment'}
          </button>
        </form>
      </div>
    </div>
  );
}
