import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-warm-900 mb-4">
          About Hayat Blog
        </h1>
        <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-serif font-bold text-warm-900 mb-4">Our Story</h2>
          <div className="space-y-4 text-warm-600 leading-relaxed">
            <p>
              Hayat Blog was born from a simple belief: that everyone has a story worth sharing,
              and that great writing has the power to connect, inspire, and transform.
            </p>
            <p>
              The word &quot;Hayat&quot; (حياة) means &quot;life&quot; in Arabic, and that\'s exactly what we celebrate
              here — the richness, diversity, and beauty of human experience in all its forms.
            </p>
            <p>
              From the latest developments in technology to the art of slow living, from
              hidden travel gems to cherished family recipes, Hayat Blog is a space for
              thoughtful, authentic storytelling.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-warm-900 mb-4">What We Cover</h2>
          <div className="space-y-3">
            {[
              { icon: '💻', title: 'Technology', desc: 'Insights on AI, web development, and digital transformation' },
              { icon: '🌿', title: 'Lifestyle', desc: 'Mindfulness, slow living, and personal well-being' },
              { icon: '✈️', title: 'Travel', desc: 'Destination guides and travel stories from around the world' },
              { icon: '🍽️', title: 'Food & Recipes', desc: 'Culinary traditions and delicious recipes to try at home' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-3 rounded-xl hover:bg-warm-100 transition-colors">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-warm-800">{item.title}</h3>
                  <p className="text-warm-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-warm-100 rounded-2xl p-8 md:p-12 mb-16">
        <h2 className="text-2xl font-serif font-bold text-warm-900 mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '🌟',
              title: 'Authenticity',
              desc: 'Every piece of content on Hayat Blog is written with genuine passion and real experience.',
            },
            {
              icon: '🤝',
              title: 'Community',
              desc: 'We believe in building connections between readers, writers, and thinkers from all walks of life.',
            },
            {
              icon: '📚',
              title: 'Quality',
              desc: 'We prioritize thoughtful, well-researched content over clickbait and superficial coverage.',
            },
          ].map((value) => (
            <div key={value.title} className="text-center p-4">
              <div className="text-4xl mb-3">{value.icon}</div>
              <h3 className="text-lg font-bold text-warm-900 mb-2">{value.title}</h3>
              <p className="text-warm-500 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-br from-warm-900 to-sage-800 text-white rounded-2xl p-10">
        <h2 className="text-2xl font-serif font-bold mb-3">Start Exploring</h2>
        <p className="text-warm-300 mb-6 max-w-md mx-auto">
          Dive into our collection of articles and find something that speaks to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/posts"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            Read Articles
          </Link>
          <Link
            href="/categories"
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
