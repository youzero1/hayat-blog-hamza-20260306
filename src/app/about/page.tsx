import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Hayat Blog — our story, mission, and the team behind your favorite lifestyle content platform.',
};

export default function AboutPage() {
  return (
    <div className="py-12 px-4">
      <div className="container-custom">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-forest-800 mb-6">
            About <span className="text-gold-600">Hayat Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <em>Hayat</em> means <strong>"life"</strong> in Turkish — and that's exactly what this blog is about.
            Real life. Better living. Authentic stories.
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-forest-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Hayat Blog, we believe that small, intentional choices lead to extraordinary lives. Whether it's perfecting your morning routine, discovering a new destination, or finding a product that genuinely improves your day — we're here to help you navigate it all.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We cover the topics that matter most to modern, conscious living: lifestyle and personal growth, health and wellness, food and recipes, travel and exploration, and the technology that helps us do it all better.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team of writers, editors, and enthusiasts brings genuine expertise and personal experience to every article we publish. We don't chase trends — we curate timeless wisdom and practical advice.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop"
              alt="Writing and creativity"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl p-10 shadow-sm mb-20">
          <h2 className="text-3xl font-serif font-bold text-forest-800 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌱',
                title: 'Authenticity',
                description: 'We only write about what we genuinely know, experience, and believe in. No fluff, no filler — just honest content.',
              },
              {
                icon: '🌍',
                title: 'Sustainability',
                description: 'We promote products and practices that are good for you and good for the planet. Conscious consumption matters.',
              },
              {
                icon: '💡',
                title: 'Practical Value',
                description: 'Every piece of content we create should provide real, actionable value. We respect your time and intelligence.',
              },
              {
                icon: '🤝',
                title: 'Community',
                description: 'Hayat Blog is more than a website — it\'s a community of people committed to living better together.',
              },
              {
                icon: '📚',
                title: 'Continuous Learning',
                description: 'We\'re always researching, reading, and growing so we can bring you the most informed perspectives possible.',
              },
              {
                icon: '✨',
                title: 'Joy',
                description: 'Life should be enjoyable. We bring warmth, curiosity, and a sense of wonder to everything we create.',
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-serif font-bold text-forest-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-forest-800 mb-8 text-center">What We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: '🌿', label: 'Lifestyle' },
              { icon: '💚', label: 'Health & Wellness' },
              { icon: '🍽️', label: 'Food & Recipes' },
              { icon: '✈️', label: 'Travel' },
              { icon: '💻', label: 'Technology' },
            ].map((topic) => (
              <div key={topic.label} className="bg-forest-50 border border-forest-100 rounded-xl p-6 text-center">
                <span className="text-3xl block mb-2">{topic.icon}</span>
                <p className="font-semibold text-forest-700 text-sm">{topic.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-forest-800 to-forest-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Let's Connect</h2>
          <p className="text-forest-200 text-lg mb-8 max-w-xl mx-auto">
            Have a story to share, a product to recommend, or just want to say hello? We'd love to hear from you.
          </p>
          <Link href="/contact" className="bg-gold-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gold-600 transition-colors duration-200 inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
