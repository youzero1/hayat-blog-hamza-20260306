# Hayat Blog

A full-stack blog platform with e-commerce elements built with Next.js, TypeScript, TypeORM, and SQLite.

## Features

- 📝 Full blog with categories, tags, and search
- 🛍️ Product showcase with affiliate links
- 📧 Newsletter subscription
- 🔧 Admin dashboard for content management
- 📱 Fully responsive design

## Getting Started

### Development

```bash
npm i
npm run dev
```

Visit http://localhost:3000

### Docker

```bash
docker-compose up -d
```

## Admin Access

Visit `/admin` to access the admin dashboard.

Default credentials (set in .env):
- Username: `admin`
- Password: `admin123`

## Environment Variables

See `.env` file for configuration options.

## Database

SQLite database is stored at `./data/hayat-blog.sqlite` and is automatically seeded with sample content on first run.
