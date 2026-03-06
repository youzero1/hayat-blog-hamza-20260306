'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-warm-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Contact Us
        </h1>
        <p className="text-warm-600 text-lg">We&apos;d love to hear from you</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-100">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-xl font-bold text-warm-900 mb-2">Message Sent!</h3>
              <p className="text-warm-600 mb-6">Thank you for reaching out. We&apos;ll get back to you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full border border-warm-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary-600 text-white py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-warm-100">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-bold text-warm-900 mb-1">Email</h3>
            <p className="text-warm-600">hello@hayatblog.com</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-warm-100">
            <div className="text-3xl mb-3">🐦</div>
            <h3 className="font-bold text-warm-900 mb-1">Social Media</h3>
            <p className="text-warm-600">@hayatblog on Twitter & Instagram</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-warm-100">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-bold text-warm-900 mb-1">Collaborations</h3>
            <p className="text-warm-600">Interested in working together? We&apos;d love to connect with brands, creators, and partners.</p>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-warm-100 rounded-2xl p-6">
            <div className="text-3xl mb-3">⏰</div>
            <h3 className="font-bold text-warm-900 mb-1">Response Time</h3>
            <p className="text-warm-600">We typically respond within 24-48 hours on business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
