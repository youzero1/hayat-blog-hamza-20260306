import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Hayat Blog',
  description: 'Learn about Hayat Blog – our mission, our team, and our passion for storytelling.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-hayat-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-hayat-800 to-earth-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">About Hayat Blog</h1>
          <p className="text-hayat-200 text-xl leading-relaxed">
            &ldquo;Hayat&rdquo; means <em>Life</em> in Arabic and Turkish. We celebrate it in all its forms.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-earth-900 mb-4">Our Mission</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-earth-600 leading-relaxed text-lg mb-4">
              Hayat Blog was founded with a single belief: that everyone has a story worth telling.
              We are a platform for curious minds, passionate writers, and engaged readers who
              believe in the power of thoughtful content to inspire, educate, and connect.
            </p>
            <p className="text-earth-600 leading-relaxed">
              From cutting-edge technology to timeless lifestyle wisdom, from exotic travel adventures
              to recipes passed down through generations, Hayat Blog covers the full spectrum of human
              experience. Our writers are experts, enthusiasts, and storytellers who bring authenticity
              and depth to every piece they write.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-earth-900 mb-6">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🌟', title: 'Authenticity', desc: 'We only publish content we believe in, written by people who live what they write.' },
              { icon: '🌍', title: 'Diversity', desc: 'We celebrate different perspectives, cultures, and voices from around the world.' },
              { icon: '💡', title: 'Quality', desc: 'Every article is carefully edited and fact-checked before it reaches our readers.' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-5 shadow-sm text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-earth-800 mb-2">{v.title}</h3>
                <p className="text-earth-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-earth-900 mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Ayşe Kaya', role: 'Technology Editor', avatar: 'https://picsum.photos/seed/author1/100/100' },
              { name: 'Mehmet Demir', role: 'Travel & Food Writer', avatar: 'https://picsum.photos/seed/author2/100/100' },
              { name: 'Fatma Yıldız', role: 'Health & Lifestyle Editor', avatar: 'https://picsum.photos/seed/author3/100/100' },
              { name: 'Ali Şahin', role: 'Business Columnist', avatar: 'https://picsum.photos/seed/author4/100/100' },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-5 shadow-sm text-center">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-3"
                />
                <h3 className="font-semibold text-earth-800">{member.name}</h3>
                <p className="text-hayat-600 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12">
          <div className="bg-hayat-700 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Hayat in Numbers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { number: '100+', label: 'Articles Published' },
                { number: '10K+', label: 'Monthly Readers' },
                { number: '6', label: 'Content Categories' },
                { number: '4', label: 'Expert Writers' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-hayat-300">{stat.number}</div>
                  <div className="text-hayat-200 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-earth-900 mb-3">Ready to Explore?</h2>
          <p className="text-earth-500 mb-6">Dive into our collection of thoughtful articles and discover stories that matter.</p>
          <Link
            href="/blog"
            className="inline-block bg-hayat-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-hayat-700 transition-colors"
          >
            Start Reading
          </Link>
        </section>
      </div>
    </div>
  );
}
