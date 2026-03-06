'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-600 to-warm-600 rounded-3xl p-10 text-center text-white">
      <div className="text-4xl mb-4">💌</div>
      <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
        Stay Inspired
      </h2>
      <p className="text-primary-100 mb-8 max-w-md mx-auto">
        Subscribe to our newsletter for the latest posts, product picks, and lifestyle inspiration delivered to your inbox.
      </p>

      {status === 'success' ? (
        <div className="bg-white/20 rounded-2xl p-6 max-w-md mx-auto">
          <div className="text-3xl mb-2">🎉</div>
          <p className="font-semibold text-lg">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-5 py-3 rounded-full text-warm-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-4 text-red-200 text-sm">{message}</p>
      )}
    </div>
  );
}
