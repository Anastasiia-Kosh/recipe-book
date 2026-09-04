# RecipeBook

RecipeBook is a full-stack recipe application built with Next.js and React.

It is designed as a personal recipe collection with authentication, recipe management, favorites, rich-text recipe editing, search, filtering, pagination, responsive layouts, and SEO support.

![RecipeBook home page](./public/readme/recipe-book-home.jpg)

## Live Demo

https://recipe-book-eight-livid.vercel.app

## Backend

Backend repository:

https://github.com/Anastasiia-Kosh/recipe-book-back

Swagger API documentation:

https://recipe-book-back-ax30.onrender.com/api-docs/

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Zustand
- Axios
- TipTap
- React Hot Toast
- React Paginate
- React Spinners
- CSS Modules
- Vercel

## Features

- User registration and login
- Cookie-based authentication
- Protected routes
- User profile management
- Avatar upload
- Recipe creation, editing and deletion
- Rich-text ingredients and instructions
- Recipe image upload
- Recipe categories
- Search and filtering
- Pagination
- Saved recipes / favorites
- Responsive desktop and mobile layouts
- Loading, error and not-found states
- SEO metadata
- Open Graph and Twitter metadata
- Dynamic sitemap
- robots.txt
- Structured Recipe JSON-LD

## Architecture

The project uses a separate frontend and backend architecture:

```text
Next.js frontend
      ↓
Next.js API routes / server requests
      ↓
Express backend
      ↓
MongoDB + Cloudinary
```

Client-side authenticated actions go through Next.js API routes, while public server-rendered data can be fetched directly from the backend.

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a `.env.local` file based on `.env.example`:

```env
BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The backend should be running separately on:

```text
http://localhost:3001
```

## Scripts

```bash
npm run dev      # start development server
npm run build    # create production build
npm start        # start production server
npm run lint     # run ESLint
```

## Project Structure

```text
app/          # routes, pages, API routes and SEO files
components/   # reusable UI components
lib/          # API clients, server API helpers and state
public/       # static assets
types/        # TypeScript types
proxy.ts      # authentication and route protection
```

## SEO

RecipeBook includes:

- global metadata
- dynamic metadata for recipe pages
- canonical URLs
- Open Graph metadata
- Twitter cards
- dynamic sitemap generation
- robots.txt
- Schema.org Recipe structured data

## Notes

The backend password-reset flow is implemented, but the production email sender is not enabled because the project does not currently use an authenticated custom sending domain. The frontend reset-password UI is therefore intentionally not included at this stage.

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB
- Images: Cloudinary
