# Spooks & Clay

A Halloween/autumn-themed ecommerce shop for handmade clay figurines, built as a personal full-stack project to learn React/TypeScript and Java/Spring Boot from scratch, with no prior backend experience.

This isn't just a practice project, the long-term goal is to turn it into a real online shop for handmade clay figurines, so it's both a learning exercise and the early stage of an actual product.

**Live site:** [spooks-and-clay.vercel.app](https://spooks-and-clay.vercel.app/)

The backend runs on Render's free tier. The first request after a quiet period can take **2-3 minutes** while the server wakes up. The site tells you when this is happening, and a "Try again" button is there if it takes too long.

## Why I made this

I wanted something more challenging than a to-do app clone, so I went with a small handmade-crafts shop with a cottagecore/vintage-Halloween theme. It gave me a reason to practice real frontend architecture (services, hooks, typed API contracts) rather than just writing components, and later to learn Java and Spring Boot by building a real API behind it.

Along the way I used an AI tool (Claude Code/Devin) for styling/boilerplate help, code review, and explaining new concepts as I learned them.

## Project structure

This is a monorepo with two separate apps:

```
frontend/   React + TypeScript (Vite) - deployed on Vercel
backend/    Java + Spring Boot REST API - runs in Docker on Render, with a PostgreSQL database on Neon
```

Both redeploy automatically when I push to `main`. See `frontend/README.md` for frontend-specific details.

## What it can do

You can browse and search the products, add them to a cart, register or log in, and place an order with your shipping details. Your past orders show up on your account page. There's also an admin role, and admin-only pages are protected on both the frontend and the backend.

## Tech stack

Frontend:

- React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7
- Zustand for the cart and auth state
- React Hook Form + Zod for forms
- A service layer and custom hooks for data fetching, with loading and error states

Backend:

- Java 17, Spring Boot 3, Spring Security with JWT
- JPA/Hibernate with PostgreSQL, database changes handled by Flyway migrations
- Controller / Service / Repository layers, with DTOs separate from the entities
- Validation, rate limiting on login and register (Bucket4j), pagination

## Things I learned the hard way

A few bugs I found and fixed that taught me the most:

- A logged-in user could place an order under someone else's account by changing the user ID in the request. Later I found a similar one, where an admin's own account page would have listed every customer's orders. Now the server always checks who is asking, instead of trusting what the frontend sends.
- Prices on orders weren't saved at the time of purchase, so changing a product's price would have changed old orders too. Stock also wasn't checked before an order went through.
- The price was calculated in six different places in the frontend, and they didn't match. A discounted product showed the sale price on its page but the full price in the cart. I moved all of it into one file, and the server now calculates the final total itself.
- Free hosting means the backend can take a few minutes to wake up. At first the site just showed an error, which looked broken. Now it retries, tells the visitor the server is waking up, and offers a "Try again" button. Only GET requests are retried automatically, because retrying an order could create it twice.

## Running it locally

Backend (needs Java 17 and a PostgreSQL database). Set the environment variables `DB_URL`, `DB_DIRECT_URL`, `DB_USERNAME`, `DB_PASSWORD` and `JWT_SECRET`, then:

```bash
cd backend
./mvnw spring-boot:run
```

Frontend, with a `frontend/.env` containing `VITE_API_BASE_URL=http://localhost:8080/api`:

```bash
cd frontend
npm install
npm run dev
```

## What's next

- [x] Database migrations
- [x] Deploy the backend and connect it to the frontend
- [x] Checkout flow
- [ ] Automated tests and CI
- [ ] Admin pages for managing products and orders (the backend endpoints exist, the UI doesn't yet)
- [ ] Image upload for products
- [ ] Payments (Stripe) and order confirmation emails
- [ ] If all goes well, actually launch it as a real shop
