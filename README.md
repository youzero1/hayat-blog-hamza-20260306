# Hayat Blog

A full-stack blog platform built with Next.js, TypeScript, TypeORM, and SQLite. "Hayat" means "Life" in Arabic and Turkish.

## Features

- 📝 Full blog with articles, categories, and authors
- 🎨 E-commerce-inspired design with a warm, earthy color palette
- 🔍 Search, filter, and sort posts
- 📱 Fully responsive design
- ⚙️ Admin panel for CRUD operations
- 🗃️ SQLite database with automatic seeding
- 🚀 Docker support for easy deployment

## Getting Started

### Local Development

```bash
# Install dependencies
npm i

# Create data directory
mkdir -p data

# Run in development mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Admin Panel

Navigate to `/admin` and use the password: `admin123`

### Docker

```bash
docker-compose up -d
```

## Environment Variables

```
DATABASE_PATH=./data/hayat-blog.db
NEXT_PUBLIC_SITE_NAME=Hayat Blog
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_PASSWORD=admin123
```

## Tech Stack

- **Next.js 14** – App Router, Server Components
- **TypeScript** – Full type safety
- **TypeORM** – Database ORM
- **better-sqlite3** – SQLite driver
- **Tailwind CSS** – Styling
- **Docker** – Containerization

## Project Structure

```
src/
├── app/           # Next.js App Router pages and API routes
├── components/    # Reusable React components
├── entities/      # TypeORM database entities
├── lib/           # Database initialization and seeding
└── types/         # TypeScript type definitions
```
