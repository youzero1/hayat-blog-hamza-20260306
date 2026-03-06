# 🌿 Hayat Blog

**Hayat** means *life* in Turkish — and that's exactly what this blog is about. A modern, full-stack content platform built with Next.js, TypeScript, and SQLite.

## ✨ Features

- **Blog Platform** — Full-featured blog with posts, categories, search, and pagination
- **E-Commerce Elements** — Product showcase with affiliate links and featured product listings
- **Category System** — Organize content by topic with filtered views
- **Contact Form** — Store messages from visitors in the database
- **SQLite Database** — Lightweight, file-based database with TypeORM
- **Auto Seeding** — Sample content is created automatically on first run
- **Fully Responsive** — Mobile-first design with Tailwind CSS
- **SEO Ready** — Metadata on every page

## 🗂️ Project Structure

```
hayat-blog/
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   ├── components/          # Reusable React components
│   ├── entities/            # TypeORM database entities
│   └── lib/                 # Database connection & seeding
├── public/                  # Static assets
├── Dockerfile
├── docker-compose.yml
└── .env
```

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Manual Docker

```bash
# Build image
docker build -t hayat-blog .

# Run container
docker run -p 3000:3000 -v hayat-data:/app/data hayat-blog
```

### Coolify Deployment

1. Push your code to a Git repository
2. In Coolify, create a new service from your repository
3. Set the build pack to **Docker Compose**
4. Set environment variables from `.env`
5. Deploy!

## 📋 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_PATH` | `./hayat-blog.sqlite` | SQLite database file path |
| `NEXT_PUBLIC_SITE_NAME` | `Hayat Blog` | Site display name |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Public site URL |
| `NODE_ENV` | `development` | Node environment |
| `PORT` | `3000` | Server port |

## 📚 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, featured posts, and products |
| `/blog` | All blog posts with search & filter |
| `/blog/[slug]` | Individual blog post with sidebar |
| `/products` | Product grid with category filter |
| `/products/[id]` | Product detail with affiliate CTA |
| `/categories` | All categories overview |
| `/categories/[slug]` | Category-filtered posts & products |
| `/about` | About Hayat Blog |
| `/contact` | Contact form |

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | List posts (with search, filter, pagination) |
| POST | `/api/posts` | Create a post |
| GET | `/api/posts/[slug]` | Get single post |
| PUT | `/api/posts/[slug]` | Update post |
| DELETE | `/api/posts/[slug]` | Delete post |
| GET | `/api/products` | List products |
| POST | `/api/products` | Create product |
| GET | `/api/products/[id]` | Get single product |
| PUT | `/api/products/[id]` | Update product |
| DELETE | `/api/products/[id]` | Delete product |
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create category |
| GET | `/api/categories/[slug]` | Get category with posts & products |
| GET | `/api/contact` | List contact submissions |
| POST | `/api/contact` | Submit contact form |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite via `better-sqlite3`
- **ORM**: TypeORM
- **Styling**: Tailwind CSS
- **Runtime**: Node.js 20

## 📄 License

MIT License — feel free to use and modify.
