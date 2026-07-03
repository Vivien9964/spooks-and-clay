# Spooks & Clay

A Halloween-themed ecommerce shop for handmade clay figurines, built as a personal project to gain hands-on experience working with React and TypeScript. The plan is to eventually pair it with a Java / Spring Boot backend, which is currently under work. Until then, this repo runs on mock data / mock auth.

This isn't just a practice project. The long-term goal is to turn it into a real online shop for my own handmade clay figurines, so it's both a coding exercise and the early stage of an actual product.

## Why I made this

I wanted something more interesting than another to-do app or clone, so I went with a small handmade-crafts shop with a cottagecore/vintage-Halloween theme. It gave me a reason to practice real frontend architecture with services, hooks, and typed API contracts, rather than just writing components, and it's a project I can point to as an example of that.

Along the way I used an AI tool (Claude Code) for some styling/boilerplate help and to explain new concepts I was learning.

## Features

- Home, shop and individual product pages
- Cart (Zustand store, persists in localStorage)
- Login / register forms with validation (React Hook Form + Zod)
- Protected `/account` route (redirects if you're not logged in)
- Proper loading / success / error states when fetching data, instead of a spinner that never reflects what's actually happening
- Custom 404 page and an error boundary to avoid a blank white screen on unexpected errors
- Fully custom design system (colors, fonts)
## Tech stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- Zustand (state management)
- React Hook Form + Zod (forms & validation)
- Lucide React (icons), sonner (toasts)

**Backend** (in progress, separate from this folder)
- Java + Spring Boot

## What I learned building this

- The difference between properly handling async state (loading/error/success) and faking it with a `setTimeout`
- How to structure a frontend so logic isn't all crammed into `useEffect` — service layer, custom hooks, typed API contracts
- Tailwind v4's new `@theme` config (no more `tailwind.config.js`) took some adjusting to
- Zustand for complex state management instead of reaching for Context API
- Designing a custom color palette and typography system instead of relying on defaults

## What's next

- [ ] Hook the frontend up to the real Spring Boot backend (currently mock services)
- [ ] Real authentication with JWT instead of the mock login
- [ ] Checkout flow + real payments
- [ ] Deploy backend + connect it to the deployed frontend
- [ ] If all goes well, actually launch it as a real shop

## Running it locally

```bash
npm install
npm run dev
```

Create a `.env` file based on `.env.example`:

```
VITE_API_BASE_URL=
```

## Project structure (frontend)

```
src/
  components/   shared UI (Header, Footer, ErrorBoundary...)
  features/     auth, cart, products (grouped by feature)
  hooks/        useProducts, useProduct, etc.
  layouts/      RootLayout
  pages/        route-level pages
  services/     fetch wrapper + API calls
  store/        Zustand stores (auth, cart, ui)
  types/        shared TS types / API contracts
```

## Live demo

Deployed on Vercel: [spooks-and-clay.vercel.app](https://spooks-and-clay.vercel.app/)

Currently running on mock data / mock auth since the backend isn't hooked up yet.
