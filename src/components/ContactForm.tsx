'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  loading: boolean;
  success: boolean;
  error: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [state, setState] = useState<FormState>({
    loading: false,
    success: false,
    error: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ loading: true, success: false, error: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setState({ loading: false, success: true, error: '' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setState({ loading: false, success: false, error: err.message });
    }
  };

  if (state.success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-serif font-bold text-forest-800 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setState({ loading: false, success: false, error: '' })}
          className="btn-outline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent bg-white"
        >
          <option value="">Select a subject</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Partnership">Partnership / Collaboration</option>
          <option value="Guest Post">Guest Post Submission</option>
          <option value="Product Recommendation">Product Recommendation</option>
          <option value="Advertising">Advertising</option>
          <option value="Feedback">Feedback</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell us what's on your mind..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent resize-none"
        />
      </div>

      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          ⚠️ {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={state.loading}
        className="w-full bg-forest-600 text-white py-4 rounded-xl font-bold text-base hover:bg-forest-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {state.loading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          '📨 Send Message'
        )}
      </button>
    </form>
  );
}
