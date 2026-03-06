# Hayat Blog

A modern, full-stack blog platform built with Next.js 14, TypeScript, TypeORM, and SQLite.

## Features

- 📝 Full blog platform with posts, categories, and comments
- 🎨 Beautiful warm-toned design with Tailwind CSS
- 🔍 Search and category filtering
- 📱 Fully responsive layout
- ⚡ Fast with Next.js server components
- 🗄️ SQLite database with TypeORM
- 🐳 Docker-ready for deployment

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker (Production)

```bash
docker-compose up -d
```

## Project Structure

- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable UI components
- `/src/entities` - TypeORM database entities
- `/src/lib` - Database connection and utilities
- `/src/types` - TypeScript type definitions

## Environment Variables

Copy `.env` and adjust as needed:

```
DATABASE_PATH=./hayat-blog.sqlite
NEXT_PUBLIC_SITE_NAME=Hayat Blog
NEXT_PUBLIC_SITE_DESCRIPTION=A modern blog platform
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite via TypeORM + better-sqlite3
- **Styling**: Tailwind CSS
- **Deployment**: Docker / Coolify compatible
