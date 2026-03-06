import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from '../entities/Post';
import { Category } from '../entities/Category';
import { Author } from '../entities/Author';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DATABASE_PATH || './data/hayat-blog.db';
const resolvedDbPath = path.resolve(process.cwd(), dbPath);
const dataDir = path.dirname(resolvedDbPath);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: resolvedDbPath,
    entities: [Post, Category, Author],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();
  await seedIfEmpty(dataSource);

  return dataSource;
}

async function seedIfEmpty(ds: DataSource): Promise<void> {
  const categoryRepo = ds.getRepository(Category);
  const count = await categoryRepo.count();
  if (count === 0) {
    await runSeed(ds);
  }
}

async function runSeed(ds: DataSource): Promise<void> {
  const categoryRepo = ds.getRepository(Category);
  const authorRepo = ds.getRepository(Author);
  const postRepo = ds.getRepository(Post);

  const categories = [
    { name: 'Technology', slug: 'technology', description: 'Latest tech trends, software, and digital innovations' },
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Tips and stories about living your best life' },
    { name: 'Travel', slug: 'travel', description: 'Explore the world through our travel stories' },
    { name: 'Food', slug: 'food', description: 'Delicious recipes and culinary adventures' },
    { name: 'Health', slug: 'health', description: 'Wellness tips, fitness guides, and health news' },
    { name: 'Business', slug: 'business', description: 'Entrepreneurship, finance, and career advice' },
  ];

  const savedCategories = await categoryRepo.save(categories);
  const catMap: Record<string, Category> = {};
  for (const c of savedCategories) {
    catMap[c.slug] = c;
  }

  const authors = [
    {
      name: 'Ayşe Kaya',
      email: 'ayse@hayatblog.com',
      bio: 'Technology enthusiast and software engineer with 10 years of experience in web development.',
      avatarUrl: 'https://picsum.photos/seed/author1/100/100',
    },
    {
      name: 'Mehmet Demir',
      email: 'mehmet@hayatblog.com',
      bio: 'Travel writer and photographer who has visited over 50 countries. Passionate about cultures and cuisines.',
      avatarUrl: 'https://picsum.photos/seed/author2/100/100',
    },
    {
      name: 'Fatma Yıldız',
      email: 'fatma@hayatblog.com',
      bio: 'Health and wellness coach, certified nutritionist, and yoga instructor based in Istanbul.',
      avatarUrl: 'https://picsum.photos/seed/author3/100/100',
    },
    {
      name: 'Ali Şahin',
      email: 'ali@hayatblog.com',
      bio: 'Business consultant and entrepreneur with experience in startups and Fortune 500 companies.',
      avatarUrl: 'https://picsum.photos/seed/author4/100/100',
    },
  ];

  const savedAuthors = await authorRepo.save(authors);

  const posts = [
    {
      title: 'The Future of Artificial Intelligence in Everyday Life',
      slug: 'future-of-artificial-intelligence-everyday-life',
      content: `<h2>Introduction</h2><p>Artificial Intelligence is no longer a concept confined to science fiction. It has permeated every aspect of our daily lives, from the smart assistants on our phones to the recommendation algorithms that curate our social media feeds.</p><h2>AI in Healthcare</h2><p>One of the most promising applications of AI is in healthcare. Machine learning algorithms can now detect diseases like cancer with accuracy that rivals or surpasses human doctors. AI-powered diagnostic tools analyze medical images, patient histories, and genetic data to provide personalized treatment recommendations.</p><h2>Smart Homes and IoT</h2><p>The Internet of Things (IoT) combined with AI has transformed our homes into intelligent environments. Smart thermostats learn your preferences, security systems recognize faces, and appliances can be controlled with voice commands. This integration creates a seamless, efficient living experience.</p><h2>Transportation Revolution</h2><p>Self-driving cars represent one of the most visible examples of AI in action. Companies like Tesla, Waymo, and traditional automakers are investing billions in autonomous vehicle technology. Beyond cars, AI is optimizing traffic flows, improving public transportation schedules, and revolutionizing logistics.</p><h2>The Ethical Dimension</h2><p>As AI becomes more integrated into our lives, we must grapple with profound ethical questions. Issues of privacy, bias in algorithms, job displacement, and the concentration of AI power in the hands of a few large corporations demand careful consideration and robust regulatory frameworks.</p><h2>Looking Ahead</h2><p>The next decade will see AI become even more embedded in our daily routines. Natural language processing will make human-computer interaction more intuitive, AI-generated content will blur the lines between human and machine creativity, and autonomous systems will handle increasingly complex tasks. The key is to harness these capabilities while ensuring they serve humanity's best interests.</p>`,
      excerpt: 'Explore how artificial intelligence is reshaping our daily lives, from healthcare to transportation, and what the future holds for this transformative technology.',
      thumbnailUrl: 'https://picsum.photos/seed/ai-tech/800/500',
      readTime: 8,
      views: 1542,
      published: true,
      categoryId: catMap['technology'].id,
      authorId: savedAuthors[0].id,
    },
    {
      title: 'Hidden Gems of Southeast Asia: A Traveler\'s Guide',
      slug: 'hidden-gems-southeast-asia-travelers-guide',
      content: `<h2>Beyond the Tourist Trail</h2><p>Southeast Asia is a region of extraordinary diversity, from the misty mountains of northern Vietnam to the turquoise waters of the Philippines. While destinations like Bali and Bangkok draw millions of visitors each year, the region harbors countless hidden treasures waiting to be discovered.</p><h2>Kampot, Cambodia</h2><p>Nestled along the Praek Tuek Chhu River, Kampot is a charming colonial town that time seems to have forgotten. Famous for its pepper plantations, the town offers a peaceful respite from the chaos of Phnom Penh. Rent a bicycle and explore the surrounding countryside, visit the nearby Bokor Hill Station, or simply relax by the river with a Khmer curry.</p><h2>Hsipaw, Myanmar</h2><p>This small town in the Shan State of Myanmar offers some of the best trekking in the country. Walk through hillside villages, encounter local ethnic minorities, and experience a way of life that has changed little over generations. The surrounding countryside is a patchwork of tea plantations, rice paddies, and forest.</p><h2>Mawlynnong, India</h2><p>Often called Asia's cleanest village, Mawlynnong sits near the Bangladesh border in Meghalaya, India. The village is famous for its living root bridges, created by training the roots of rubber trees across streams. The community's commitment to cleanliness and sustainable tourism makes it a model for responsible development.</p><h2>Practical Tips</h2><p>When exploring off-the-beaten-path destinations in Southeast Asia, flexibility is essential. Transportation can be unpredictable, accommodation limited, and language barriers significant. Embrace these challenges as part of the adventure, and you'll be rewarded with experiences that most tourists never encounter.</p>`,
      excerpt: 'Discover the lesser-known wonders of Southeast Asia, from Cambodia\'s riverside Kampot to Myanmar\'s trekking paradise of Hsipaw.',
      thumbnailUrl: 'https://picsum.photos/seed/sea-travel/800/500',
      readTime: 10,
      views: 2103,
      published: true,
      categoryId: catMap['travel'].id,
      authorId: savedAuthors[1].id,
    },
    {
      title: 'Mediterranean Diet: A Lifestyle, Not Just a Diet',
      slug: 'mediterranean-diet-lifestyle-not-just-diet',
      content: `<h2>What is the Mediterranean Diet?</h2><p>The Mediterranean diet is more than just a list of foods to eat and avoid—it's a way of life that has evolved over thousands of years in the countries bordering the Mediterranean Sea. At its core, it emphasizes whole, minimally processed foods, healthy fats, and the joy of eating with family and friends.</p><h2>Key Components</h2><p>The foundation of the Mediterranean diet consists of fruits, vegetables, whole grains, legumes, nuts, and seeds. Olive oil is the primary source of added fat, providing heart-healthy monounsaturated fats and powerful antioxidants. Fish and seafood are consumed at least twice a week, while poultry, eggs, and dairy are eaten in moderate amounts.</p><h2>Health Benefits</h2><p>Decades of research have linked the Mediterranean diet to numerous health benefits. Studies show it reduces the risk of heart disease, stroke, type 2 diabetes, and certain cancers. It's also associated with better cognitive function and a lower risk of Alzheimer's disease. The anti-inflammatory properties of the diet's key components—olive oil, fish, and plant foods—are thought to be responsible for many of these benefits.</p><h2>The Social Dimension</h2><p>Perhaps the most underappreciated aspect of the Mediterranean diet is its emphasis on the social aspects of eating. Meals are events to be savored with family and friends, not rushed tasks to be completed as quickly as possible. This mindful approach to eating may contribute to the diet's health benefits by reducing stress and promoting a healthier relationship with food.</p><h2>Getting Started</h2><p>Transitioning to a Mediterranean diet doesn't require a complete overhaul of your eating habits. Start by replacing butter with olive oil, incorporating more fish into your weekly meals, adding a salad to your daily lunch, and snacking on nuts and fruit instead of processed foods. Small, sustainable changes will lead to lasting improvements in your health and wellbeing.</p>`,
      excerpt: 'Discover why the Mediterranean diet is consistently ranked as one of the world\'s healthiest eating patterns and how to incorporate it into your daily life.',
      thumbnailUrl: 'https://picsum.photos/seed/mediterranean/800/500',
      readTime: 7,
      views: 1876,
      published: true,
      categoryId: catMap['health'].id,
      authorId: savedAuthors[2].id,
    },
    {
      title: 'Building a Sustainable Business in the Digital Age',
      slug: 'building-sustainable-business-digital-age',
      content: `<h2>The New Business Landscape</h2><p>The digital revolution has fundamentally transformed how businesses operate, compete, and create value. Companies that embraced digital transformation early have gained significant advantages, while those that lagged behind have struggled to remain relevant. Building a sustainable business today requires a deep understanding of digital technologies, changing consumer behaviors, and evolving business models.</p><h2>Digital-First Strategy</h2><p>A digital-first strategy doesn't mean abandoning physical operations—it means thinking about digital possibilities first when designing products, services, and processes. This approach involves leveraging data analytics, cloud computing, and digital platforms to create more efficient operations and better customer experiences.</p><h2>Sustainable Practices</h2><p>Modern businesses must also grapple with growing pressure to adopt sustainable practices. Consumers, investors, and regulators are increasingly demanding that companies consider their environmental and social impact. Sustainability is no longer just a PR exercise—it's becoming a core business requirement that affects everything from supply chain management to product design.</p><h2>Building a Strong Culture</h2><p>In the digital age, talent is the most valuable resource. Building a culture that attracts and retains top talent requires offering meaningful work, opportunities for growth, flexible working arrangements, and a clear sense of purpose. Companies that get culture right gain a significant competitive advantage.</p><h2>The Path Forward</h2><p>The businesses that will thrive in the coming decades are those that can balance innovation with stability, growth with sustainability, and efficiency with humanity. This requires visionary leadership, adaptive organizational structures, and a commitment to continuous learning and improvement.</p>`,
      excerpt: 'Learn how to build a business that thrives in the digital age while maintaining sustainable practices and a strong company culture.',
      thumbnailUrl: 'https://picsum.photos/seed/business/800/500',
      readTime: 9,
      views: 1234,
      published: true,
      categoryId: catMap['business'].id,
      authorId: savedAuthors[3].id,
    },
    {
      title: 'The Art of Turkish Cuisine: Recipes from Grandmother\'s Kitchen',
      slug: 'art-of-turkish-cuisine-recipes-grandmother-kitchen',
      content: `<h2>A Culinary Heritage</h2><p>Turkish cuisine is a rich tapestry woven from thousands of years of history, geography, and cultural exchange. Spanning the crossroads of Europe and Asia, Turkey's food culture reflects influences from the Ottoman Empire, the Silk Road, and the diverse regions within the country itself. From the kebabs of Gaziantep to the seafood of Istanbul's Bosphorus shores, Turkish food is as varied as the landscape itself.</p><h2>The Meze Tradition</h2><p>No exploration of Turkish cuisine is complete without the meze—small dishes served as appetizers or as a meal in themselves. Classics include hummus, baba ganoush, dolma (stuffed grape leaves), cacık (yogurt with cucumber and garlic), and ezme (spiced tomato paste). These dishes are traditionally enjoyed slowly, accompanied by raki or tea, in the company of good friends.</p><h2>Grandmother's Lentil Soup</h2><p>Perhaps no dish better represents Turkish home cooking than mercimek çorbası (red lentil soup). My grandmother made this simple, nourishing soup at least once a week. The recipe: sauté onion and garlic in olive oil, add red lentils, potatoes, carrots, and broth, simmer until soft, blend until smooth, and finish with a drizzle of butter and dried mint. Simple, nutritious, and deeply comforting.</p><h2>The Importance of Bread</h2><p>Bread is sacred in Turkish culture. The saying 'don't waste bread' (ekmek israfı olmasın) is drilled into children from an early age. Fresh bread from the neighborhood bakery (fırın) is an essential part of every meal, used to scoop up mezze, soak up stews, and complement kebabs. The smell of fresh simit (sesame-encrusted bread rings) being sold by street vendors is one of the most distinctive and beloved aromas of Turkish cities.</p>`,
      excerpt: 'Journey into the heart of Turkish culinary traditions, exploring the rich flavors, techniques, and stories behind this magnificent cuisine.',
      thumbnailUrl: 'https://picsum.photos/seed/turkish-food/800/500',
      readTime: 11,
      views: 2567,
      published: true,
      categoryId: catMap['food'].id,
      authorId: savedAuthors[1].id,
    },
    {
      title: 'Mindfulness in the Digital Age: Finding Peace Amid the Noise',
      slug: 'mindfulness-digital-age-finding-peace-amid-noise',
      content: `<h2>The Attention Economy</h2><p>We live in an age of unprecedented distraction. Our devices ping, buzz, and light up with a constant stream of notifications demanding our attention. Social media platforms are engineered by brilliant minds to be as addictive as possible. News cycles churn relentlessly, generating anxiety and outrage. Amid this noise, the practice of mindfulness has emerged as a crucial tool for maintaining mental health and clarity.</p><h2>What Mindfulness Is (and Isn't)</h2><p>Mindfulness is simply the practice of paying attention to the present moment with curiosity and without judgment. It's not about emptying your mind, achieving a state of bliss, or detaching from the world. It's about being fully present with whatever is happening right now—your thoughts, feelings, bodily sensations, and the environment around you.</p><h2>Practical Mindfulness for Busy Lives</h2><p>You don't need to meditate for an hour each day to benefit from mindfulness. Start with just five minutes of focused breathing each morning. Pay attention to the sensations of eating one meal each day without your phone. Take a short mindful walk during your lunch break. These small practices, done consistently, can significantly reduce stress and improve your overall wellbeing.</p><h2>Digital Mindfulness</h2><p>Applying mindfulness to our digital habits is particularly important. Before picking up your phone, pause and ask: 'Why am I reaching for this device? What do I hope to find?' Create phone-free zones in your home—especially the bedroom. Use technology intentionally rather than habitually. These simple practices can transform your relationship with digital devices.</p>`,
      excerpt: 'Discover how mindfulness practices can help you navigate the constant distractions of the digital age and find a sense of inner peace.',
      thumbnailUrl: 'https://picsum.photos/seed/mindfulness/800/500',
      readTime: 8,
      views: 1998,
      published: true,
      categoryId: catMap['lifestyle'].id,
      authorId: savedAuthors[2].id,
    },
    {
      title: 'Web Development Trends to Watch in 2025',
      slug: 'web-development-trends-2025',
      content: `<h2>The Evolving Web</h2><p>Web development continues to evolve at a breakneck pace. New frameworks, tools, and paradigms emerge constantly, making it both exciting and challenging to stay current. As we look ahead to 2025 and beyond, several key trends are poised to reshape how we build and experience the web.</p><h2>AI-Powered Development</h2><p>AI coding assistants like GitHub Copilot and Claude have already transformed developer workflows. In the coming years, we'll see AI take on increasingly sophisticated roles in the development process—from generating entire components based on natural language descriptions to identifying bugs and security vulnerabilities in real-time. This won't replace developers but will amplify their capabilities dramatically.</p><h2>Edge Computing</h2><p>The shift from centralized servers to edge computing brings computation closer to users, reducing latency and enabling new types of applications. Frameworks like Next.js and platforms like Vercel and Cloudflare Workers are leading this transition, making it increasingly easy for developers to deploy globally distributed applications.</p><h2>WebAssembly's Rise</h2><p>WebAssembly (WASM) is quietly revolutionizing what's possible in the browser. By allowing languages like Rust, C++, and Go to run in the browser at near-native speeds, WASM is enabling a new generation of high-performance web applications—from browser-based video editors to complex scientific simulations.</p><h2>The Component Economy</h2><p>The rise of headless CMSs, design systems, and component libraries is creating a new economy of reusable UI components. Tools like shadcn/ui are making it easier than ever to build polished, accessible interfaces quickly. This component-driven approach is becoming the standard for modern web development.</p>`,
      excerpt: 'Stay ahead of the curve with our comprehensive overview of the most important web development trends that will define 2025.',
      thumbnailUrl: 'https://picsum.photos/seed/webdev/800/500',
      readTime: 9,
      views: 3102,
      published: true,
      categoryId: catMap['technology'].id,
      authorId: savedAuthors[0].id,
    },
    {
      title: 'Cappadocia: Where Fairy Tales Come to Life',
      slug: 'cappadocia-where-fairy-tales-come-to-life',
      content: `<h2>A Landscape Like No Other</h2><p>In the heart of Turkey, a landscape of extraordinary beauty and strangeness awaits. Cappadocia's iconic fairy chimneys—tall, thin columns of rock topped with dark capstones—rise from the valley floor like sentinels from another world. Carved by millions of years of volcanic eruptions and erosion, this surreal landscape has captured the imagination of travelers for centuries.</p><h2>Underground Cities</h2><p>Beneath the surface of Cappadocia lies an equally astonishing world. Ancient peoples carved entire cities into the soft volcanic rock, creating multilevel underground complexes complete with homes, churches, wineries, and storage rooms. Derinkuyu, one of the largest, descends eight levels below ground and could shelter up to 20,000 people. These underground retreats provided refuge from invaders and harsh winters for thousands of years.</p><h2>Hot Air Balloon Rides</h2><p>Perhaps no experience captures the magic of Cappadocia as perfectly as a hot air balloon ride at dawn. As the sun rises over the valleys, dozens of colorful balloons ascend into the sky, drifting silently over the fairy chimneys and cave churches below. It's one of those rare travel experiences that exceeds all expectations. Book well in advance—this is one of the most popular activities in all of Turkey.</p><h2>Cave Hotels and Local Life</h2><p>Staying in a cave hotel is not just a gimmick—it's a genuinely comfortable and unique experience. The thick stone walls maintain a constant temperature year-round, and many caves have been beautifully converted into atmospheric rooms with all modern amenities. Beyond the tourist sites, Cappadocia's small towns offer a glimpse into traditional Turkish life: pottery workshops, carpet weavers, and local restaurants serving the region's distinctive cuisine.</p>`,
      excerpt: 'Journey to Turkey\'s most magical region, where volcanic rock formations, underground cities, and sunrise balloon rides create an unforgettable experience.',
      thumbnailUrl: 'https://picsum.photos/seed/cappadocia/800/500',
      readTime: 10,
      views: 2891,
      published: true,
      categoryId: catMap['travel'].id,
      authorId: savedAuthors[1].id,
    },
    {
      title: 'The Power of Morning Routines: Transform Your Day',
      slug: 'power-of-morning-routines-transform-your-day',
      content: `<h2>Why Mornings Matter</h2><p>How you start your morning sets the tone for your entire day. Research consistently shows that people who have structured morning routines report higher levels of productivity, better mental health, and greater life satisfaction. The first few hours of the day, before the demands of work and social obligations kick in, offer a precious window for self-care, reflection, and intentional action.</p><h2>The Science of Morning Routines</h2><p>Our willpower and decision-making capacity are highest in the morning and gradually deplete throughout the day—a phenomenon psychologists call 'decision fatigue.' By front-loading your day with healthy habits—exercise, meditation, healthy breakfast—you're using your peak cognitive resources when they're most abundant. This explains why many highly successful people swear by their morning routines.</p><h2>Building Your Ideal Morning</h2><p>The best morning routine is one you can actually maintain. Start small—even a 10-minute routine is better than none. Common elements of effective morning routines include: waking at a consistent time (even on weekends), avoiding screens for the first 30 minutes, movement (whether a full workout or a simple stretching session), journaling or meditation, and a nutritious breakfast.</p><h2>Common Pitfalls to Avoid</h2><p>The biggest mistake people make when starting a morning routine is trying to do too much too soon. Adding five new habits simultaneously is a recipe for failure. Instead, focus on establishing one habit at a time. Once that habit feels automatic—typically after 30-60 days—add the next one. This gradual approach builds lasting change rather than short-lived enthusiasm.</p>`,
      excerpt: 'Learn how establishing a powerful morning routine can revolutionize your productivity, mental health, and overall quality of life.',
      thumbnailUrl: 'https://picsum.photos/seed/morning/800/500',
      readTime: 7,
      views: 1654,
      published: true,
      categoryId: catMap['lifestyle'].id,
      authorId: savedAuthors[2].id,
    },
    {
      title: 'From Startup to Scale: Lessons Learned the Hard Way',
      slug: 'from-startup-to-scale-lessons-learned-hard-way',
      content: `<h2>The Startup Dream</h2><p>Every entrepreneur starts with a vision—a product or service that will change the world, disrupt an industry, or solve a pressing problem. But the distance between vision and reality is vast, filled with unexpected challenges, painful pivots, and hard-won lessons. Having built and scaled two companies over the past decade, I've learned more from my failures than my successes.</p><h2>Hire Slow, Fire Fast</h2><p>The most common mistake I see founders make is hiring too quickly, especially in the early stages. When you're growing fast and capital is abundant, it's tempting to scale headcount rapidly. But every hire changes your company's culture and dynamics. Take time to find people who share your values and have the skills you need. And don't delay the inevitable when someone isn't working out—it's not fair to them or to your team.</p><h2>Focus is Your Most Valuable Resource</h2><p>In the startup world, opportunities are everywhere. Customers will ask for features you never planned to build. Partners will propose collaborations that seem attractive. Investors will suggest pivots. Learning to say no is one of the most important skills a founder can develop. Every yes is an implicit no to something else. Guard your focus fiercely.</p><h2>Product-Market Fit is Everything</h2><p>Before worrying about scaling, growth hacking, or fundraising, obsess over product-market fit. This means finding a product that customers love so much that they tell others about it without being prompted. The signs of product-market fit are unmistakable: unsolicited referrals, customers who are disappointed if you discontinue a feature, and a growing retention curve. Until you have this, everything else is premature.</p>`,
      excerpt: 'Hard-won wisdom from a serial entrepreneur on what it really takes to build and scale a successful startup in today\'s competitive landscape.',
      thumbnailUrl: 'https://picsum.photos/seed/startup/800/500',
      readTime: 12,
      views: 1423,
      published: true,
      categoryId: catMap['business'].id,
      authorId: savedAuthors[3].id,
    },
    {
      title: 'Plant-Based Proteins: Your Complete Guide',
      slug: 'plant-based-proteins-complete-guide',
      content: `<h2>The Protein Question</h2><p>One of the most common concerns people raise when considering a plant-based diet is protein. 'But where do you get your protein?' is a question vegetarians and vegans hear constantly. The good news: getting adequate protein from plant sources is entirely possible—and often easier than people think. The key is understanding which plant foods are rich in protein and how to combine them for complete amino acid profiles.</p><h2>Protein-Rich Plant Foods</h2><p>Legumes—lentils, chickpeas, black beans, and soybeans—are the workhorses of plant-based protein. A cup of cooked lentils contains about 18 grams of protein. Tofu, tempeh, and edamame (from soybeans) are particularly versatile and protein-dense. Quinoa is unique among grains in that it contains all nine essential amino acids. Nuts, seeds (especially hemp and pumpkin seeds), and even some vegetables like peas and broccoli contribute meaningful amounts of protein.</p><h2>Complete vs. Incomplete Proteins</h2><p>Animal proteins are 'complete,' meaning they contain all nine essential amino acids. Most plant proteins are 'incomplete'—they lack one or more essential amino acids. However, by eating a variety of plant proteins throughout the day, you can easily meet all your amino acid needs. Classic combinations like rice and beans or hummus and pita work because the amino acid profiles complement each other.</p><h2>Practical Meal Ideas</h2><p>A tofu scramble with vegetables for breakfast, a lentil soup with whole grain bread for lunch, and a chickpea curry with quinoa for dinner would easily provide 60-70 grams of protein—adequate for most adults. Add a handful of nuts as a snack and you're well above the recommended daily intake. Plant-based eating is not about deprivation; it's about discovering a world of delicious, nutritious foods.</p>`,
      excerpt: 'Everything you need to know about meeting your protein needs on a plant-based diet, with practical meal ideas and nutrition tips.',
      thumbnailUrl: 'https://picsum.photos/seed/plantprotein/800/500',
      readTime: 9,
      views: 1789,
      published: true,
      categoryId: catMap['food'].id,
      authorId: savedAuthors[2].id,
    },
    {
      title: 'Cybersecurity Essentials for Small Business Owners',
      slug: 'cybersecurity-essentials-small-business-owners',
      content: `<h2>The Growing Threat Landscape</h2><p>Cyberattacks are no longer just a concern for large corporations. Small businesses are increasingly targeted by cybercriminals who see them as easy prey—often lacking the security resources of larger enterprises while still holding valuable customer data and financial information. In 2023, nearly 43% of cyberattacks targeted small businesses, and the average cost of a data breach for a small business exceeded $100,000.</p><h2>The Most Common Threats</h2><p>Phishing emails—fraudulent messages designed to trick employees into revealing passwords or clicking malicious links—account for the majority of successful cyberattacks. Ransomware, which encrypts your files and demands payment for their release, has become increasingly prevalent and destructive. Weak passwords and unpatched software create vulnerabilities that attackers can exploit with minimal effort.</p><h2>Essential Security Measures</h2><p>The good news is that the most effective security measures are often the simplest. Enable multi-factor authentication (MFA) on all accounts—this single step prevents the vast majority of unauthorized access attempts. Keep all software and operating systems updated. Use a reputable password manager to create and store strong, unique passwords for every account. Regularly back up your data to an offline location.</p><h2>Building a Security Culture</h2><p>Technology alone cannot protect your business. Your employees are both your greatest vulnerability and your strongest defense. Regular security training helps employees recognize phishing attempts, understand safe browsing practices, and know what to do if they suspect a security incident. Creating a culture where employees feel comfortable reporting potential security issues without fear of blame is essential for effective security.</p>`,
      excerpt: 'Protect your small business from cyber threats with these essential security practices that don\'t require a large IT budget.',
      thumbnailUrl: 'https://picsum.photos/seed/cybersec/800/500',
      readTime: 10,
      views: 987,
      published: true,
      categoryId: catMap['technology'].id,
      authorId: savedAuthors[0].id,
    },
  ];

  await postRepo.save(posts);
}
