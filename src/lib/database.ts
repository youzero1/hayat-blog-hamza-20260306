import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from '../entities/Post';
import { Category } from '../entities/Category';
import { Tag } from '../entities/Tag';
import { Product } from '../entities/Product';
import { Subscriber } from '../entities/Subscriber';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DATABASE_PATH || './data/hayat-blog.sqlite';

// Ensure data directory exists
const dataDir = path.dirname(path.resolve(DB_PATH));
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
    database: path.resolve(DB_PATH),
    entities: [Post, Category, Tag, Product, Subscriber],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();
  await seedDatabase(dataSource);
  return dataSource;
}

async function seedDatabase(ds: DataSource): Promise<void> {
  const categoryRepo = ds.getRepository(Category);
  const postRepo = ds.getRepository(Post);
  const productRepo = ds.getRepository(Product);
  const tagRepo = ds.getRepository(Tag);

  const existingCategories = await categoryRepo.count();
  if (existingCategories > 0) return;

  // Seed categories
  const categories = await categoryRepo.save([
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Tips and inspiration for everyday living' },
    { name: 'Technology', slug: 'technology', description: 'Latest tech trends and reviews' },
    { name: 'Fashion', slug: 'fashion', description: 'Style guides and fashion trends' },
    { name: 'Health & Wellness', slug: 'health-wellness', description: 'Your guide to a healthier life' },
    { name: 'Home & Living', slug: 'home-living', description: 'Interior design and home decor ideas' },
  ]);

  // Seed tags
  const tags = await tagRepo.save([
    { name: 'Tips', slug: 'tips' },
    { name: 'Guide', slug: 'guide' },
    { name: 'Review', slug: 'review' },
    { name: 'Trending', slug: 'trending' },
    { name: 'Beginner', slug: 'beginner' },
  ]);

  const now = new Date();

  // Seed posts
  await postRepo.save([
    {
      title: '10 Simple Ways to Improve Your Daily Routine',
      slug: '10-simple-ways-to-improve-your-daily-routine',
      content: `<h2>Transform Your Morning</h2><p>Starting your day on the right foot can make all the difference. Here are ten proven strategies to help you build a more productive and fulfilling daily routine.</p><h3>1. Wake Up Early</h3><p>Early risers tend to be more proactive and productive. Try setting your alarm 30 minutes earlier each week until you reach your desired wake-up time.</p><h3>2. Hydrate First Thing</h3><p>Drink a large glass of water as soon as you wake up. After 7-8 hours of sleep, your body is dehydrated and needs replenishment.</p><h3>3. Exercise Daily</h3><p>Even a 20-minute walk can significantly improve your mood and energy levels throughout the day.</p><h3>4. Plan Your Day</h3><p>Take 10 minutes each morning to plan your tasks and priorities. This simple habit can double your productivity.</p><h3>5. Eat a Nutritious Breakfast</h3><p>Your brain needs fuel to function optimally. Choose foods rich in protein and complex carbohydrates.</p><p>Implementing these changes gradually will help them stick long-term. Remember, consistency is key!</p>`,
      excerpt: 'Discover ten proven strategies to transform your daily routine and boost your productivity and wellbeing.',
      isPublished: true,
      publishedAt: now,
      category: categories[0],
      categoryId: categories[0].id,
      tags: [tags[0], tags[1]],
      featuredImage: null,
    },
    {
      title: 'The Best Smart Home Devices of 2024',
      slug: 'best-smart-home-devices-2024',
      content: `<h2>Smart Home Revolution</h2><p>The smart home industry has exploded with innovative products that make our lives easier, more comfortable, and more energy-efficient.</p><h3>Smart Speakers</h3><p>Voice-controlled speakers have become the hub of the modern smart home. They can control lights, thermostats, locks, and more with simple voice commands.</p><h3>Smart Thermostats</h3><p>A smart thermostat can learn your preferences and automatically adjust temperature settings to save energy while keeping you comfortable.</p><h3>Security Cameras</h3><p>Modern security cameras offer HD video, night vision, motion detection, and cloud storage for complete peace of mind.</p><h3>Smart Lighting</h3><p>Programmable LED bulbs can change colors, dim automatically, and be controlled remotely — perfect for creating ambiance and saving electricity.</p><p>Investing in smart home technology is an investment in your quality of life and energy savings.</p>`,
      excerpt: 'A comprehensive guide to the top smart home devices that will transform your living space in 2024.',
      isPublished: true,
      publishedAt: now,
      category: categories[1],
      categoryId: categories[1].id,
      tags: [tags[2], tags[3]],
      featuredImage: null,
    },
    {
      title: 'Spring Fashion Trends You Need to Know',
      slug: 'spring-fashion-trends-2024',
      content: `<h2>Fresh Styles for a New Season</h2><p>Spring brings with it a burst of color, new silhouettes, and exciting fashion possibilities. Here's what the runways and street style scenes are saying about this season's must-have looks.</p><h3>Pastel Perfection</h3><p>Soft pastels are dominating this spring. Think lavender, mint, peach, and butter yellow in everything from flowy dresses to tailored blazers.</p><h3>Maximalist Prints</h3><p>Bold floral prints, abstract patterns, and colorful stripes are having a major moment. Don't be afraid to mix and match.</p><h3>Sustainable Fashion</h3><p>Eco-conscious fashion continues to grow. Look for brands using organic materials, recycled fabrics, and ethical production methods.</p><h3>Statement Accessories</h3><p>Oversized sunglasses, chunky jewelry, and bold handbags are the finishing touches that elevate any outfit this season.</p>`,
      excerpt: 'Explore the hottest spring fashion trends from runway to streetwear, and learn how to incorporate them into your wardrobe.',
      isPublished: true,
      publishedAt: now,
      category: categories[2],
      categoryId: categories[2].id,
      tags: [tags[3]],
      featuredImage: null,
    },
    {
      title: 'Mindfulness for Beginners: A Complete Guide',
      slug: 'mindfulness-for-beginners-complete-guide',
      content: `<h2>Starting Your Mindfulness Journey</h2><p>Mindfulness is the practice of being fully present and aware of your thoughts, feelings, and surroundings without judgment. It's a powerful tool for reducing stress and improving overall wellbeing.</p><h3>What is Mindfulness?</h3><p>At its core, mindfulness is about paying attention to the present moment with openness and curiosity. It's not about emptying your mind, but rather observing your thoughts without getting caught up in them.</p><h3>Getting Started with Meditation</h3><p>Begin with just 5 minutes a day. Find a quiet spot, sit comfortably, close your eyes, and focus on your breath. When your mind wanders (and it will), gently bring your attention back.</p><h3>Mindful Eating</h3><p>Try eating one meal a day without distractions. Notice the colors, textures, and flavors of your food. Eat slowly and savor each bite.</p><h3>Mindful Walking</h3><p>Turn your daily walk into a meditation practice by paying attention to each step, the sensation of your feet on the ground, and the sounds and sights around you.</p>`,
      excerpt: 'Learn the basics of mindfulness meditation and discover how to incorporate mindfulness into your everyday life.',
      isPublished: true,
      publishedAt: now,
      category: categories[3],
      categoryId: categories[3].id,
      tags: [tags[1], tags[4]],
      featuredImage: null,
    },
    {
      title: 'Transform Your Living Room on a Budget',
      slug: 'transform-living-room-budget',
      content: `<h2>Beautiful Home, Smart Spending</h2><p>You don't need a massive budget to create a beautiful, functional living space. With some creativity and smart shopping, you can completely transform your living room.</p><h3>Start with Paint</h3><p>A fresh coat of paint is the most cost-effective way to change the entire feel of a room. Choose a color that reflects your personality and complements your furniture.</p><h3>Rearrange Your Furniture</h3><p>Before buying anything new, try rearranging your existing furniture. A different layout can make a room feel completely new.</p><h3>Add Plants</h3><p>Indoor plants add life, color, and even improve air quality. Start with low-maintenance varieties like pothos, snake plants, or ZZ plants.</p><h3>Layer Your Lighting</h3><p>Good lighting transforms any space. Combine overhead lighting with floor lamps, table lamps, and candles for a warm, inviting atmosphere.</p><h3>Shop Secondhand</h3><p>Thrift stores, estate sales, and online marketplaces are treasure troves of unique, affordable home decor pieces.</p>`,
      excerpt: 'Discover creative and budget-friendly ideas to refresh your living room and make it feel brand new.',
      isPublished: true,
      publishedAt: now,
      category: categories[4],
      categoryId: categories[4].id,
      tags: [tags[0], tags[1]],
      featuredImage: null,
    },
  ]);

  // Seed products
  await productRepo.save([
    {
      name: 'Premium Yoga Mat',
      description: 'Eco-friendly, non-slip yoga mat perfect for all types of yoga and fitness exercises. Made from natural rubber with excellent cushioning for joint protection.',
      price: 45.99,
      imageUrl: null,
      affiliateLink: '#',
      isFeatured: true,
      category: categories[3],
      categoryId: categories[3].id,
    },
    {
      name: 'Smart LED Desk Lamp',
      description: 'Adjustable smart LED desk lamp with USB charging port, multiple brightness levels, and color temperature settings. Perfect for home office productivity.',
      price: 35.00,
      imageUrl: null,
      affiliateLink: '#',
      isFeatured: true,
      category: categories[1],
      categoryId: categories[1].id,
    },
    {
      name: 'Minimalist Tote Bag',
      description: 'Versatile canvas tote bag with leather handles. Spacious enough for everyday essentials, stylish enough for any occasion.',
      price: 28.50,
      imageUrl: null,
      affiliateLink: '#',
      isFeatured: true,
      category: categories[2],
      categoryId: categories[2].id,
    },
    {
      name: 'Aromatherapy Diffuser',
      description: 'Ultrasonic essential oil diffuser with 7 LED light colors and automatic shut-off. Creates a calming, spa-like atmosphere in any room.',
      price: 22.99,
      imageUrl: null,
      affiliateLink: '#',
      isFeatured: false,
      category: categories[4],
      categoryId: categories[4].id,
    },
    {
      name: 'Organic Green Tea Set',
      description: 'Premium collection of organic green teas from Japan. Includes Sencha, Matcha, and Gyokuro varieties for a complete tea experience.',
      price: 18.75,
      imageUrl: null,
      affiliateLink: '#',
      isFeatured: false,
      category: categories[0],
      categoryId: categories[0].id,
    },
    {
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality for music lovers.',
      price: 89.99,
      imageUrl: null,
      affiliateLink: '#',
      isFeatured: true,
      category: categories[1],
      categoryId: categories[1].id,
    },
  ]);
}
