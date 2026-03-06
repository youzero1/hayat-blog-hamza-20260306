import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Hayat Blog team. We\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <div className="py-12 px-4">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">Contact Information</h2>
            </div>
            {[
              {
                icon: '📧',
                title: 'Email',
                content: 'hello@hayatblog.com',
                description: 'We respond within 24-48 hours',
              },
              {
                icon: '📍',
                title: 'Based In',
                content: 'Istanbul, Turkey 🇹🇷',
                description: 'Writing from the crossroads of East and West',
              },
              {
                icon: '⏰',
                title: 'Working Hours',
                content: 'Mon–Fri, 9am–6pm (TRT)',
                description: 'We\'ll get back to you promptly',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <p className="font-semibold text-forest-800">{item.title}</p>
                  <p className="text-gray-700">{item.content}</p>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-gray-100">
              <p className="font-semibold text-forest-800 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {['Twitter', 'Instagram', 'Pinterest'].map((social) => (
                  <span
                    key={social}
                    className="px-4 py-2 bg-forest-50 text-forest-700 rounded-lg text-sm font-medium"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
