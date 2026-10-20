# Spooks & Clay - Frontend

The React + TypeScript frontend for Spooks & Clay, a Halloween-themed shop for handmade clay figurines. It talks to the Spring Boot backend in `../backend`. For the full project overview, see the [root README](../README.md).

Live on Vercel: [spooks-and-clay.vercel.app](https://spooks-and-clay.vercel.app/)

## Features

- Home, shop and product pages, with search, category filter and sorting by price
- Cart that stays saved after a refresh, and a checkout page that places a real order
- Login and register, and you stay logged in after refreshing the page
- Account page with your past orders, and admin-only pages that customers can't open
- Loading and error states on every page that fetches data, plus a "Try again" button and a message when the server is slow to wake up
- A 404 page and an error boundary, so an unexpected error doesn't leave a blank white screen
- My own color palette and fonts

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- Zustand (state management)
- React Hook Form + Zod (forms & validation)
- Lucide React (icons), sonner (toasts)

## What I learned building this

- The difference between properly handling async state (loading/error/success) and faking it with a `setTimeout`
- How to structure a frontend so logic isn't all crammed into `useEffect`: service layer, custom hooks, typed API contracts
- Tailwind v4's new `@theme` config (no more `tailwind.config.js`) took some adjusting to
- Zustand for complex state management instead of reaching for Context API
- Designing a custom color palette and typography system instead of relying on defaults
- Once the real backend was connected, I found out that some of my TypeScript types didn't match what the API actually sends. TypeScript can't check that for you at runtime
- Keeping one rule in one place: the price was calculated in six different components and they had started showing different numbers

## Running it locally

```bash
npm install
npm run dev
```

Create a `.env` file based on `.env.example`:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

You'll need the backend running too (see the root README).

## Project structure

```
src/
  components/   shared UI (Header, Footer, ErrorBoundary...)
  config/       environment variables
  features/     auth, cart, checkout, products (grouped by feature)
  hooks/        useProducts, useProduct, useOrders, etc.
  layouts/      RootLayout, AdminLayout
  pages/        route-level pages
  services/     fetch wrapper + API calls
  store/        Zustand stores (auth, cart, ui)
  types/        shared TS types / API contracts
  utils/        price calculation
```
