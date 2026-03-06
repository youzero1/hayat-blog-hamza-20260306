import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from '@/entities/Post';
import { Product } from '@/entities/Product';
import { Category } from '@/entities/Category';
import { Contact } from '@/entities/Contact';
import path from 'path';

const DATABASE_PATH = process.env.DATABASE_PATH || './hayat-blog.sqlite';

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  const dbPath = path.isAbsolute(DATABASE_PATH)
    ? DATABASE_PATH
    : path.join(process.cwd(), DATABASE_PATH);

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    synchronize: true,
    logging: false,
    entities: [Post, Product, Category, Contact],
  });

  await dataSource.initialize();
  await seedDatabase(dataSource);

  return dataSource;
}

async function seedDatabase(ds: DataSource): Promise<void> {
  const categoryRepo = ds.getRepository(Category);
  const postRepo = ds.getRepository(Post);
  const productRepo = ds.getRepository(Product);

  const existingCategories = await categoryRepo.count();
  if (existingCategories > 0) return;

  // Seed Categories
  const categories = await categoryRepo.save([
    {
      name: 'Lifestyle',
      slug: 'lifestyle',
      description: 'Tips and insights for a better everyday life',
    },
    {
      name: 'Health & Wellness',
      slug: 'health-wellness',
      description: 'Your guide to a healthier, happier you',
    },
    {
      name: 'Technology',
      slug: 'technology',
      description: 'Latest tech trends and reviews',
    },
    {
      name: 'Travel',
      slug: 'travel',
      description: 'Explore the world with Hayat Blog',
    },
    {
      name: 'Food & Recipes',
      slug: 'food-recipes',
      description: 'Delicious recipes and culinary adventures',
    },
  ]);

  const [lifestyle, health, tech, travel, food] = categories;

  // Seed Posts
  await postRepo.save([
    {
      title: 'How to Build a Morning Routine That Actually Works',
      slug: 'morning-routine-that-works',
      content: `<p>A great morning routine can transform your entire day. Here are the key elements to building one that sticks.</p>
<h2>Start Small</h2>
<p>Don't try to overhaul your entire morning at once. Begin with just one or two habits and build from there. Consistency is more important than perfection.</p>
<h2>Wake Up at the Same Time</h2>
<p>Your body thrives on routine. Setting a consistent wake-up time — even on weekends — helps regulate your circadian rhythm and makes mornings feel more natural.</p>
<h2>Hydrate First</h2>
<p>Before reaching for coffee, drink a full glass of water. After 7-8 hours of sleep, your body is dehydrated, and proper hydration kickstarts your metabolism.</p>
<h2>Move Your Body</h2>
<p>Even 10-15 minutes of gentle movement — stretching, yoga, or a short walk — can boost your energy levels and mental clarity for the rest of the day.</p>
<h2>Plan Your Day</h2>
<p>Take 5 minutes to review your goals and priorities. Writing down your top three tasks for the day creates focus and intention.</p>
<p>Remember, the perfect morning routine is the one you'll actually do. Start small, be patient, and let it evolve naturally over time.</p>`,
      excerpt: 'Discover how to create a sustainable morning routine that boosts productivity and sets you up for success every day.',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
      author: 'Hayat Team',
      isPublished: true,
      isFeatured: true,
      categoryId: lifestyle.id,
    },
    {
      title: 'The Ultimate Guide to Mindful Eating',
      slug: 'ultimate-guide-mindful-eating',
      content: `<p>Mindful eating is a powerful practice that can transform your relationship with food and improve your overall health.</p>
<h2>What Is Mindful Eating?</h2>
<p>Mindful eating means paying full attention to the experience of eating — the taste, texture, smell, and satisfaction of food — without judgment or distraction.</p>
<h2>Benefits of Mindful Eating</h2>
<ul>
<li>Better digestion and nutrient absorption</li>
<li>Reduced overeating and emotional eating</li>
<li>Greater satisfaction from meals</li>
<li>Improved relationship with food</li>
<li>Weight management support</li>
</ul>
<h2>How to Practice</h2>
<p>Start by eliminating distractions during meals. Put away your phone, turn off the TV, and sit at a table. Eat slowly and chew thoroughly. Pay attention to hunger and fullness cues.</p>
<h2>The 20-Minute Rule</h2>
<p>It takes about 20 minutes for your brain to receive signals of fullness from your stomach. Eating slowly ensures you stop eating when you're satisfied, not overfull.</p>`,
      excerpt: 'Learn how mindful eating can revolutionize your relationship with food and support your health goals.',
      coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop',
      author: 'Hayat Team',
      isPublished: true,
      isFeatured: true,
      categoryId: health.id,
    },
    {
      title: 'Top 10 Productivity Apps of 2024',
      slug: 'top-10-productivity-apps-2024',
      content: `<p>In our increasingly digital world, the right apps can make a huge difference in how much you accomplish each day.</p>
<h2>1. Notion</h2>
<p>An all-in-one workspace for notes, tasks, databases, and project management. Notion's flexibility makes it suitable for individuals and teams alike.</p>
<h2>2. Todoist</h2>
<p>A powerful task manager with natural language input, priority levels, and seamless integration with other tools.</p>
<h2>3. Forest</h2>
<p>A unique focus app that gamifies deep work by growing virtual trees during focused sessions.</p>
<h2>4. Obsidian</h2>
<p>A note-taking app that creates a network of your ideas through bidirectional linking.</p>
<h2>5. Calendly</h2>
<p>Eliminates the back-and-forth of scheduling by letting others book time directly on your calendar.</p>
<h2>6. RescueTime</h2>
<p>Automatically tracks how you spend time on your devices and provides detailed productivity reports.</p>`,
      excerpt: 'Boost your productivity with these essential apps that top performers rely on in 2024.',
      coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop',
      author: 'Tech Editor',
      isPublished: true,
      isFeatured: true,
      categoryId: tech.id,
    },
    {
      title: 'Hidden Gems: Exploring Turkey\'s Coastal Villages',
      slug: 'hidden-gems-turkey-coastal-villages',
      content: `<p>Turkey's Aegean and Mediterranean coastlines are dotted with charming villages that most tourists never discover.</p>
<h2>Alaçatı</h2>
<p>This beautiful village near Çeşme is known for its stone houses covered in bougainvillea, boutique hotels, and excellent windsurfing conditions.</p>
<h2>Şirince</h2>
<p>Nestled in the hills above Selçuk, Şirince is famous for its fruit wines, traditional houses, and proximity to the ancient ruins of Ephesus.</p>
<h2>Akyaka</h2>
<p>A planned eco-village at the mouth of the Azmak River, Akyaka offers pristine waters, traditional Ottoman-style architecture, and excellent kite surfing.</p>
<h2>Datça</h2>
<p>Located on a narrow peninsula between the Aegean and Mediterranean, Datça is beloved for its wild almond forests, crystal-clear bays, and tranquil atmosphere.</p>
<h2>Getting There</h2>
<p>These villages are best explored by renting a car from major airports in Izmir, Bodrum, or Dalaman. The scenic coastal roads are part of the adventure.</p>`,
      excerpt: 'Discover Turkey\'s most beautiful and lesser-known coastal villages that offer authentic experiences away from the tourist crowds.',
      coverImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop',
      author: 'Travel Writer',
      isPublished: true,
      isFeatured: false,
      categoryId: travel.id,
    },
    {
      title: 'Classic Turkish Breakfast: A Complete Guide',
      slug: 'classic-turkish-breakfast-guide',
      content: `<p>The Turkish breakfast, or "kahvaltı," is considered one of the world's great breakfast traditions. Here's how to recreate this feast at home.</p>
<h2>The Essential Components</h2>
<p>A proper Turkish breakfast is a spread, not a single dish. It includes:</p>
<ul>
<li><strong>Cheeses:</strong> White feta-style cheese, kashkaval (aged yellow cheese)</li>
<li><strong>Olives:</strong> Both black and green varieties, often marinated</li>
<li><strong>Eggs:</strong> Typically fried or scrambled with butter, or menemen (eggs with tomatoes and peppers)</li>
<li><strong>Bread:</strong> Fresh, crusty bread or simit (sesame rings)</li>
<li><strong>Preserves:</strong> Honey, various fruit jams</li>
<li><strong>Vegetables:</strong> Sliced tomatoes, cucumbers, fresh herbs</li>
<li><strong>Tea:</strong> Strong black tea served in tulip-shaped glasses</li>
</ul>
<h2>Menemen Recipe</h2>
<p>Heat olive oil in a pan. Add diced onions and green peppers, cook until soft. Add chopped tomatoes and cook until broken down. Crack in eggs and stir gently until just set. Season with salt and cumin.</p>`,
      excerpt: 'Learn everything about the beloved Turkish breakfast tradition and how to recreate this magnificent spread at home.',
      coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop',
      author: 'Food Editor',
      isPublished: true,
      isFeatured: false,
      categoryId: food.id,
    },
    {
      title: 'Digital Detox: How to Reclaim Your Time',
      slug: 'digital-detox-reclaim-your-time',
      content: `<p>In an age of constant connectivity, intentional breaks from technology can be genuinely transformative.</p>
<h2>Signs You Need a Digital Detox</h2>
<ul>
<li>You reach for your phone first thing in the morning</li>
<li>You feel anxious without your phone nearby</li>
<li>You struggle to be present in social situations</li>
<li>Screen time is affecting your sleep quality</li>
<li>You mindlessly scroll without purpose</li>
</ul>
<h2>How to Start</h2>
<p>You don't need to go cold turkey. Start with small, intentional breaks. Try a "phone-free hour" before bed, or designate meal times as screen-free.</p>
<h2>Create Phone-Free Zones</h2>
<p>Designate certain areas of your home — bedroom, dining table — as phone-free zones. This creates natural boundaries without requiring constant willpower.</p>
<h2>Replace Scrolling with Intentional Activities</h2>
<p>Reading, journaling, cooking, walking in nature — having alternatives ready makes it easier to resist the pull of the screen.</p>`,
      excerpt: 'Take back control of your attention and time with these practical digital detox strategies.',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop',
      author: 'Hayat Team',
      isPublished: true,
      isFeatured: false,
      categoryId: lifestyle.id,
    },
    {
      title: 'Yoga for Beginners: Start Your Practice Today',
      slug: 'yoga-for-beginners-start-today',
      content: `<p>Yoga is one of the most accessible and beneficial practices you can adopt for your physical and mental wellbeing.</p>
<h2>Why Start Yoga?</h2>
<p>Regular yoga practice offers numerous benefits including improved flexibility, strength, balance, stress reduction, and enhanced mind-body awareness.</p>
<h2>Essential Poses for Beginners</h2>
<h3>Mountain Pose (Tadasana)</h3>
<p>The foundation of all standing poses. Stand tall with feet together, weight evenly distributed, and breathe deeply.</p>
<h3>Downward-Facing Dog (Adho Mukha Svanasana)</h3>
<p>An iconic pose that stretches the entire back body. Start on hands and knees, lift hips up and back.</p>
<h3>Child's Pose (Balasana)</h3>
<p>A resting pose that calms the mind and gently stretches the back. Kneel and fold forward with arms extended.</p>
<h2>Getting Started</h2>
<p>You only need a mat and comfortable clothing. Start with 15-20 minute sessions, three times per week. Consistency over intensity is key.</p>`,
      excerpt: 'Everything you need to know to start a rewarding yoga practice, from essential poses to building a sustainable routine.',
      coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop',
      author: 'Wellness Editor',
      isPublished: true,
      isFeatured: false,
      categoryId: health.id,
    },
    {
      title: 'How to Travel the World on a Budget',
      slug: 'travel-world-on-budget',
      content: `<p>Exploring the world doesn't have to drain your savings. With smart planning, budget travel can be both comfortable and enriching.</p>
<h2>Book Flights Strategically</h2>
<p>Use fare comparison tools like Google Flights, Skyscanner, or Kayak. Be flexible with dates — flying mid-week or during shoulder season can save hundreds.</p>
<h2>Accommodation Alternatives</h2>
<p>Hotels aren't the only option. Hostels, guesthouses, house-sitting, Couchsurfing, and platforms like Airbnb offer affordable alternatives that often provide richer local experiences.</p>
<h2>Eat Like a Local</h2>
<p>Avoid tourist restaurant areas. Eat at local markets, street food stalls, and neighborhood restaurants. Not only is it cheaper, it's often more delicious and authentic.</p>
<h2>Free Activities</h2>
<p>Many cities offer free walking tours (tip-based), free museum days, public parks, beaches, and festivals. Research before you arrive to take advantage of these.</p>
<h2>Travel Slower</h2>
<p>Rushing between destinations costs money and energy. Staying longer in fewer places reduces transportation costs and allows for deeper experiences.</p>`,
      excerpt: 'Proven strategies for traveling the world without breaking the bank, from finding cheap flights to eating well on a budget.',
      coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
      author: 'Travel Writer',
      isPublished: true,
      isFeatured: false,
      categoryId: travel.id,
    },
  ]);

  // Seed Products
  await productRepo.save([
    {
      name: 'Premium Yoga Mat',
      description: 'Professional-grade non-slip yoga mat with alignment lines. Perfect for all skill levels. Made from eco-friendly TPE material that provides excellent cushioning and grip. Includes a carrying strap and is easy to clean. Dimensions: 183cm x 61cm x 6mm.',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop',
      affiliateLink: 'https://example.com/yoga-mat',
      isActive: true,
      categoryId: health.id,
    },
    {
      name: 'Smart Water Bottle',
      description: 'Hydration-tracking smart bottle that reminds you to drink water throughout the day. Features LED time markers, made from BPA-free Tritan plastic. Holds 32oz. Tracks your daily water intake and glows to remind you to hydrate every hour.',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop',
      affiliateLink: 'https://example.com/smart-bottle',
      isActive: true,
      categoryId: health.id,
    },
    {
      name: 'Travel Backpack 40L',
      description: 'Versatile travel backpack with laptop compartment, multiple organizer pockets, and comfortable ergonomic straps. Water-resistant nylon construction. Features TSA-friendly design, hidden back pocket for valuables, and folds flat for easy storage when not in use.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop',
      affiliateLink: 'https://example.com/travel-backpack',
      isActive: true,
      categoryId: travel.id,
    },
    {
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and comfortable memory foam ear cups. Perfect for travel, work-from-home, or focused deep work sessions. Folds flat for easy transport.',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop',
      affiliateLink: 'https://example.com/headphones',
      isActive: true,
      categoryId: tech.id,
    },
    {
      name: 'Morning Ritual Tea Set',
      description: 'Curated collection of premium organic teas for your morning ritual. Includes 5 varieties: Energizing Matcha, Calming Chamomile, Antioxidant Green, Spiced Chai, and Turkish Black Tea. Each box contains 20 premium-grade tea bags.',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop',
      affiliateLink: 'https://example.com/tea-set',
      isActive: true,
      categoryId: food.id,
    },
    {
      name: 'Leather Journal',
      description: 'Hand-stitched genuine leather journal with 200 pages of acid-free, fountain pen-friendly paper. Perfect for journaling, sketching, or planning your adventures. Includes a bookmark ribbon and elastic closure band.',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop',
      affiliateLink: 'https://example.com/leather-journal',
      isActive: true,
      categoryId: lifestyle.id,
    },
    {
      name: 'Portable Coffee Maker',
      description: 'Compact and lightweight French press coffee maker, perfect for travel and camping. Made from borosilicate glass with a durable stainless steel frame. Makes 2 cups at a time and comes in a protective neoprene sleeve.',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop',
      affiliateLink: 'https://example.com/coffee-maker',
      isActive: true,
      categoryId: food.id,
    },
    {
      name: 'Mechanical Keyboard',
      description: 'Compact tenkeyless mechanical keyboard with customizable RGB backlighting and tactile switches. Great for programmers, writers, and productivity enthusiasts. Compatible with Mac and Windows. Includes extra keycaps and a detachable USB-C cable.',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop',
      affiliateLink: 'https://example.com/mechanical-keyboard',
      isActive: true,
      categoryId: tech.id,
    },
  ]);
}
