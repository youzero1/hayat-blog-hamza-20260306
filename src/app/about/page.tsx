import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-warm-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          About Hayat Blog
        </h1>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      {/* Story */}
      <div className="bg-white rounded-2xl p-10 shadow-sm border border-warm-100 mb-10">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-warm-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">✨</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-warm-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Our Story
            </h2>
            <p className="text-warm-600 leading-relaxed mb-4">
              Welcome to Hayat Blog — where &ldquo;hayat,&rdquo; meaning &ldquo;life&rdquo; in many languages, reflects our core belief that every day is an opportunity to learn, grow, and enjoy the beautiful journey of living.
            </p>
            <p className="text-warm-600 leading-relaxed">
              Founded with a passion for sharing authentic, practical, and inspiring content, Hayat Blog has grown into a community of curious, style-conscious, and health-minded individuals who believe in living well.
            </p>
          </div>
        </div>
      </div>

      {/* What We Cover */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-warm-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          What We Cover
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { emoji: '🌿', title: 'Lifestyle', desc: 'Everyday tips and routines to help you live your best life.' },
            { emoji: '💻', title: 'Technology', desc: 'Reviews and guides for the latest tech that simplifies your life.' },
            { emoji: '👗', title: 'Fashion', desc: 'Style inspiration that is accessible, sustainable, and fun.' },
            { emoji: '🧘', title: 'Health & Wellness', desc: 'Mind, body, and soul — your complete guide to feeling great.' },
            { emoji: '🏠', title: 'Home & Living', desc: 'Create a beautiful, functional space you love coming home to.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-6 border border-warm-100">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-warm-900 mb-2">{item.title}</h3>
              <p className="text-warm-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-br from-primary-50 to-warm-100 rounded-2xl p-10 text-center mb-10">
        <h2 className="text-2xl font-bold text-warm-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Our Mission
        </h2>
        <p className="text-warm-600 text-lg leading-relaxed max-w-2xl mx-auto">
          To inspire and empower our readers to live more intentionally, beautifully, and joyfully — one article at a time.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/blog"
          className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors inline-block mr-4"
        >
          Read Our Blog
        </Link>
        <Link
          href="/contact"
          className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors inline-block"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
