import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from '@/entities/Post';
import { Category } from '@/entities/Category';
import { Comment } from '@/entities/Comment';
import path from 'path';

const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.resolve(process.cwd(), 'hayat-blog.sqlite');

let dataSource: DataSource | null = null;
let initialized = false;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && initialized) {
    return dataSource;
  }

  if (!dataSource) {
    dataSource = new DataSource({
      type: 'better-sqlite3',
      database: DB_PATH,
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
      entities: [Post, Category, Comment],
    });
  }

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
    initialized = true;
    await seedDatabase(dataSource);
  }

  return dataSource;
}

async function seedDatabase(ds: DataSource): Promise<void> {
  const categoryRepo = ds.getRepository(Category);
  const postRepo = ds.getRepository(Post);
  const commentRepo = ds.getRepository(Comment);

  const existingCategories = await categoryRepo.count();
  if (existingCategories > 0) return;

  // Seed Categories
  const categories = await categoryRepo.save([
    {
      name: 'Technology',
      slug: 'technology',
      description: 'Latest news, reviews and insights from the world of technology.',
    },
    {
      name: 'Lifestyle',
      slug: 'lifestyle',
      description: 'Tips and inspiration for living your best life.',
    },
    {
      name: 'Travel',
      slug: 'travel',
      description: 'Explore the world through our travel guides and stories.',
    },
    {
      name: 'Food & Recipes',
      slug: 'food-recipes',
      description: 'Delicious recipes and food culture from around the world.',
    },
  ]);

  const [tech, lifestyle, travel, food] = categories;

  // Seed Posts
  const posts = await postRepo.save([
    {
      title: 'The Future of Artificial Intelligence in Everyday Life',
      slug: 'future-of-artificial-intelligence-everyday-life',
      content: `<p>Artificial intelligence is no longer a concept confined to science fiction novels or research laboratories. It has permeated our daily lives in ways that were unimaginable just a decade ago. From the moment you wake up and ask your smart speaker about the weather, to the personalized recommendations you receive on streaming platforms at night, AI is quietly orchestrating much of what we experience.</p>

<h2>The Rise of Personal AI Assistants</h2>
<p>Voice assistants like Siri, Alexa, and Google Assistant have become household staples. These systems use natural language processing (NLP) to understand human speech and respond appropriately. But they're only the beginning. The next generation of AI assistants will be capable of managing complex tasks, scheduling appointments, making purchases, and even providing emotional support.</p>

<h2>AI in Healthcare</h2>
<p>Perhaps nowhere is the impact of AI more profound than in healthcare. Machine learning algorithms can now detect certain types of cancer with accuracy that rivals or exceeds that of trained physicians. AI systems analyze thousands of medical images, identifying anomalies that human eyes might miss. Drug discovery, which traditionally takes decades, is being accelerated by AI that can predict how molecular compounds will interact.</p>

<h2>Autonomous Vehicles</h2>
<p>Self-driving cars represent one of the most ambitious applications of AI. Companies like Tesla, Waymo, and various traditional automakers are investing billions into autonomous vehicle technology. These systems must process enormous amounts of sensor data in real-time, making split-second decisions that affect human lives. While fully autonomous vehicles aren't yet ubiquitous on public roads, the technology is rapidly advancing.</p>

<h2>The Ethical Dimension</h2>
<p>With all this power comes significant responsibility. Questions about AI bias, privacy, job displacement, and the concentration of power in the hands of a few large corporations are pressing concerns. Society must grapple with how to ensure that AI development proceeds in a way that benefits everyone, not just those at the top of the economic ladder.</p>

<p>The future of AI is bright but complex. As these systems become more capable, our relationship with technology will fundamentally transform. The key will be ensuring that humans remain at the center of this transformation, guiding AI towards outcomes that enhance human flourishing.</p>`,
      excerpt: 'Artificial intelligence is reshaping our world in profound ways. From healthcare to transportation, explore how AI is transforming everyday life and what the future might hold.',
      coverImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
      author: 'Ahmed Al-Rashid',
      isFeatured: true,
      isPublished: true,
      category: tech,
    },
    {
      title: 'Discovering the Hidden Gems of Morocco',
      slug: 'discovering-hidden-gems-morocco',
      content: `<p>Morocco is a country that never ceases to surprise. Nestled at the crossroads of Africa and Europe, it offers a sensory experience unlike anywhere else on earth. The bustling medinas, the majestic Atlas Mountains, the sweeping Sahara Desert, and the azure Atlantic coastline all contribute to a tapestry of experiences that linger long after you've returned home.</p>

<h2>The Magic of Marrakech</h2>
<p>No visit to Morocco is complete without spending time in Marrakech. The heart of the city is Djemaa el-Fna, a massive square that transforms throughout the day. In the morning, it's relatively calm, with orange juice vendors and argan oil sellers setting up their stalls. By afternoon, storytellers, acrobats, and musicians begin to arrive. And at night, it becomes a magnificent outdoor dining room, filled with the aromas of grilled meats and tagines.</p>

<h2>The Blue City of Chefchaouen</h2>
<p>Tucked into the Rif Mountains of northern Morocco, Chefchaouen is one of the most photographed cities in the world, and for good reason. Almost every building in the old medina is painted in shades of blue and white, creating an ethereal, dreamlike atmosphere. The city has a more relaxed pace than Marrakech, making it perfect for wandering through narrow alleyways without a particular destination in mind.</p>

<h2>The Sahara Experience</h2>
<p>Watching the sunrise from atop a sand dune in Erg Chebbi, near the town of Merzouga, is a transcendent experience. The silence of the desert, broken only by the wind rustling over the sand, creates a sense of peace that is difficult to find in our busy modern lives. Spending a night in a Berber camp under the vast, star-filled sky is something that stays with you forever.</p>

<h2>Moroccan Cuisine</h2>
<p>Moroccan food is a revelation. The complex spice blends, the slow-cooked tagines, the flaky bastilla pastries filled with pigeon and almonds, and the sweet-savory combinations that characterize the cuisine reflect the country's rich history of trade and cultural exchange. Don't miss the traditional mint tea ceremony - it's not just about the tea, but about hospitality and connection.</p>`,
      excerpt: 'Journey through Morocco\'s vibrant medinas, majestic mountains, and golden Sahara. Discover why this North African kingdom captivates every traveler who visits.',
      coverImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80',
      author: 'Sara Benali',
      isFeatured: true,
      isPublished: true,
      category: travel,
    },
    {
      title: 'Mastering the Art of Slow Living',
      slug: 'mastering-art-of-slow-living',
      content: `<p>In a world that seems to grow faster and more demanding by the day, the slow living movement offers a compelling alternative. It's not about doing everything at a snail's pace; it's about doing everything at the right pace. It's about quality over quantity, depth over breadth, and being present in each moment rather than always racing toward the next.</p>

<h2>What Is Slow Living?</h2>
<p>Slow living is a mindset, a philosophy, and a practice. It encompasses everything from the food you eat (the slow food movement) to the way you work, travel, and spend your leisure time. At its core, it's about making conscious choices about how you allocate your most precious resource: time.</p>

<h2>The Morning Ritual</h2>
<p>One of the best places to start practicing slow living is in the morning. Instead of immediately reaching for your phone to check emails and social media, try spending the first 30 minutes of your day in quiet contemplation. Make coffee or tea with care, savoring the process as much as the beverage itself. Sit by a window and simply observe the world waking up around you.</p>

<h2>Curating Your Space</h2>
<p>Your environment profoundly influences your mental state. A cluttered, chaotic space tends to produce a cluttered, chaotic mind. Embrace the Japanese concept of 'ma' - the beauty of empty space. You don't need to live like a monk, but intentionally creating areas of calm and order in your home can help you feel more centered throughout the day.</p>

<h2>Digital Boundaries</h2>
<p>Perhaps the greatest challenge to slow living in the modern age is our relationship with technology. Smartphones and social media are designed to capture and hold our attention, making it difficult to be present in the physical world. Setting boundaries - phone-free meal times, no screens an hour before bed, regular digital detox days - can dramatically improve your sense of wellbeing.</p>`,
      excerpt: 'In our hyper-connected, always-on world, slow living offers a powerful antidote. Learn how to embrace a more intentional, meaningful way of life.',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      author: 'Leila Mansouri',
      isFeatured: false,
      isPublished: true,
      category: lifestyle,
    },
    {
      title: 'The Perfect Moroccan Tagine Recipe',
      slug: 'perfect-moroccan-tagine-recipe',
      content: `<p>The tagine is more than just a dish; it's a culinary tradition that has been passed down through Moroccan families for centuries. Named after the conical clay pot in which it's cooked, a tagine is essentially a slow-cooked stew that combines meat (or vegetables), aromatics, spices, and often fruit or nuts into something magical.</p>

<h2>Understanding the Tagine</h2>
<p>The beauty of the tagine pot lies in its design. As the food cooks, steam rises and condenses on the cone-shaped lid, dripping back down and creating a self-basting effect. This means you need very little added liquid, and the ingredients essentially cook in their own juices, resulting in incredibly tender meat and deeply flavored sauces.</p>

<h2>Ingredients (serves 4-6)</h2>
<ul>
<li>1.5 kg lamb shoulder, cut into large chunks</li>
<li>2 large onions, sliced</li>
<li>4 cloves garlic, minced</li>
<li>2 tsp ground cumin</li>
<li>2 tsp ground coriander</li>
<li>1 tsp ground cinnamon</li>
<li>1 tsp ground ginger</li>
<li>1/2 tsp ground turmeric</li>
<li>1/2 tsp cayenne pepper</li>
<li>400g canned tomatoes</li>
<li>100g dried apricots</li>
<li>50g blanched almonds</li>
<li>Preserved lemon (optional but recommended)</li>
<li>Fresh coriander and parsley to garnish</li>
<li>2 tbsp olive oil</li>
<li>Salt and pepper to taste</li>
</ul>

<h2>Method</h2>
<p>Begin by marinating the lamb. Combine all the spices with the olive oil and rub thoroughly into the lamb pieces. If time permits, let this marinate for several hours or overnight in the refrigerator.</p>

<p>Heat the tagine pot (or a heavy-bottomed casserole dish) over medium heat. Add a little oil and brown the lamb in batches, setting aside once colored. In the same pot, soften the onions for about 10 minutes, then add the garlic and cook for another minute.</p>

<p>Return the lamb to the pot, add the canned tomatoes and just enough water or stock to barely cover the meat. Bring to a simmer, then reduce heat to very low. If using a traditional clay tagine, place over a diffuser to prevent cracking.</p>

<p>Cook, covered, for 1.5 to 2 hours, adding the apricots in the last 30 minutes. The lamb should be incredibly tender and falling off the bone. Adjust seasoning, garnish with fresh herbs, almonds, and strips of preserved lemon.</p>

<p>Serve with warm flatbread or couscous and plenty of extra sauce for dipping.</p>`,
      excerpt: 'Master the art of cooking a traditional Moroccan lamb tagine with dried apricots and almonds. A warming, fragrant dish that will transport you straight to North Africa.',
      coverImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      author: 'Fatima Zahra',
      isFeatured: false,
      isPublished: true,
      category: food,
    },
    {
      title: 'Building Your First Web Application with Next.js',
      slug: 'building-first-web-application-nextjs',
      content: `<p>Next.js has become one of the most popular frameworks for building modern web applications. Developed by Vercel, it extends React with powerful features like server-side rendering, static site generation, and an intuitive file-based routing system. Whether you're a seasoned developer or just getting started, Next.js offers a smooth path to building production-ready applications.</p>

<h2>Why Next.js?</h2>
<p>Before diving into the technical details, let's understand why Next.js has become so popular. Traditional React applications render entirely in the browser, which can lead to poor SEO and slower initial page loads. Next.js solves this by offering multiple rendering strategies: Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR).</p>

<h2>Setting Up Your Project</h2>
<p>Getting started with Next.js is remarkably simple. With Node.js installed on your machine, you can create a new project with a single command:</p>
<pre><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
<p>This command creates a fully configured project with TypeScript support, Tailwind CSS for styling, and ESLint for code quality. The project structure is intuitive, with the <code>app</code> directory (in Next.js 13+) serving as the root of your application.</p>

<h2>Understanding the App Router</h2>
<p>The App Router, introduced in Next.js 13, represents a significant evolution in how you build Next.js applications. Each directory in the <code>app</code> folder represents a route, and each route can have its own layout, loading state, error boundary, and page component. This co-location of related files makes large applications much easier to organize and maintain.</p>

<h2>Server Components vs Client Components</h2>
<p>One of the most important concepts in modern Next.js is the distinction between Server Components and Client Components. Server Components render on the server and can directly access databases and file systems without exposing sensitive data to the client. Client Components, marked with the 'use client' directive, render in the browser and have access to React state and browser APIs.</p>

<h2>Deploying Your Application</h2>
<p>Next.js applications can be deployed to various platforms. Vercel, the company behind Next.js, offers the most seamless deployment experience, but you can also deploy to any platform that supports Node.js. For self-hosting, Next.js provides a standalone output mode that bundles everything needed to run the application into a minimal set of files.</p>`,
      excerpt: 'Learn how to build a modern web application using Next.js, the React framework that combines the best of server-side and client-side rendering for optimal performance.',
      coverImage: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&q=80',
      author: 'Youssef Khalil',
      isFeatured: false,
      isPublished: true,
      category: tech,
    },
    {
      title: 'A Weekend in Santorini: Sun, Sea, and Serenity',
      slug: 'weekend-santorini-sun-sea-serenity',
      content: `<p>There are places in this world that seem almost too beautiful to be real, where the scenery looks as though it was painted by an artist rather than sculpted by geological forces. Santorini is one such place. The iconic blue-domed churches perched on the caldera cliffs, the sunsets that turn the sky into a canvas of orange and pink, the pristine Aegean waters below - everything about this Greek island seems designed to take your breath away.</p>

<h2>Getting There</h2>
<p>Santorini (officially known as Thira) is accessible by plane via Santorini National Airport, which receives direct flights from many European cities, especially in summer. Alternatively, you can take a ferry from Athens' port of Piraeus, a journey that takes about 5-8 hours depending on the route. The ferry approach to Santorini, sailing into the caldera and seeing the villages clinging to the cliffs above, is an experience in itself.</p>

<h2>Oia: The Crown Jewel</h2>
<p>No visit to Santorini is complete without spending time in Oia, the village that graces so many postcards and Instagram feeds. The village clings to the northern tip of the island, its traditional cave houses and boutique hotels carved into the volcanic rock. The streets are narrow, the walls are white, and the views at every turn are spectacular. The famous Oia sunset is so celebrated that crowds gather hours in advance to secure the best viewing spots.</p>

<h2>The Beaches</h2>
<p>Santorini's beaches are unlike those anywhere else in the world, largely because of the island's volcanic history. Red Beach, near the ancient site of Akrotiri, is dramatically beautiful, with towering red and black volcanic cliffs framing a small bay of reddish-black sand. Perissa and Perivolos offer long stretches of black sand beach with excellent water sports facilities and beach bars.</p>

<h2>The Wine</h2>
<p>Santorini has a unique winemaking tradition that dates back thousands of years. The volcanic soil and the island's unusual training method for grapevines - winding them in baskets close to the ground to protect them from the fierce Meltemi winds - produce grapes of extraordinary concentration. The Assyrtiko grape variety, almost exclusively grown on Santorini, produces crisp, mineral-rich white wines that are unlike anything else you'll find in the wine world.</p>`,
      excerpt: 'Experience the magic of Santorini, from the iconic blue-domed churches of Oia to the volcanic beaches and world-class local wines. A guide to making the most of this Aegean paradise.',
      coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
      author: 'Nadia Christopoulos',
      isFeatured: false,
      isPublished: true,
      category: travel,
    },
  ]);

  // Seed Comments
  await commentRepo.save([
    {
      authorName: 'Mohammed Hassan',
      email: 'mohammed@example.com',
      content: 'Fascinating article! The section on AI in healthcare really resonates with me. I work in the medical field and we\'re already seeing incredible results from AI-assisted diagnostics.',
      post: posts[0],
    },
    {
      authorName: 'Emily Chen',
      email: 'emily@example.com',
      content: 'Great overview of AI trends. I\'m particularly excited about the potential for AI to help solve climate change challenges. Do you plan to write about that topic?',
      post: posts[0],
    },
    {
      authorName: 'Rachid Benali',
      email: 'rachid@example.com',
      content: 'As a Moroccan, this article brings such warmth to my heart. You\'ve captured the spirit of Morocco beautifully! One small addition - don\'t miss the Todgha Gorge if you\'re traveling through the south.',
      post: posts[1],
    },
    {
      authorName: 'Sophie Martin',
      email: 'sophie@example.com',
      content: 'I visited Chefchaouen last spring and it was absolutely magical. Your description is spot on! The slower pace compared to Marrakech was such a relief. Already planning my next trip.',
      post: posts[1],
    },
    {
      authorName: 'David Park',
      email: 'david@example.com',
      content: 'This recipe is incredible! I made it for my family last Sunday and they couldn\'t stop raving about it. The combination of lamb and dried apricots is genius. Will definitely be making this again.',
      post: posts[3],
    },
  ]);
}
