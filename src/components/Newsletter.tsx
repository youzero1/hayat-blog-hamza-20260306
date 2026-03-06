'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-warm-900 to-sage-800 rounded-2xl p-6 text-white">
      <div className="text-2xl mb-2">📬</div>
      <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
      <p className="text-warm-300 text-sm mb-4 leading-relaxed">
        Subscribe to get the latest posts delivered directly to your inbox.
      </p>

      {submitted ? (
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">🎉</div>
          <p className="text-warm-200 text-sm font-medium">Thanks for subscribing!</p>
          <p className="text-warm-400 text-xs mt-1">We\'ll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full bg-white/10 border border-white/20 text-white placeholder-warm-400 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            Subscribe Now
          </button>
        </form>
      )}
    </div>
  );
}
