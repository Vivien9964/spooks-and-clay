# Spooks & Clay

A Halloween/autumn-themed ecommerce shop for handmade clay figurines, built as a personal full-stack project to learn React/TypeScript and Java/Spring Boot from scratch, with no prior backend experience.

This isn't just a practice project, the long-term goal is to turn it into a real online shop for handmade clay figurines, so it's both a learning exercise and the early stage of an actual product.

**Live frontend:** [spooks-and-clay.vercel.app](https://spooks-and-clay.vercel.app/) (currently running on mock product/auth data, the backend below isn't deployed or connected yet)

## Why I made this

I wanted something more challenging than a to-do app clone, so I went with a small handmade-crafts shop with a cottagecore/vintage-Halloween theme. It gave me a reason to practice real frontend architecture (services, hooks, typed API contracts) rather than just writing components, and later to learn Java and Spring Boot by building a real API behind it.

Along the way I used an AI tool (Claude Code/Devin) for styling/boilerplate help, code review, and explaining new concepts as I learned them.

## Project structure

This is a monorepo with two independent apps:

```
frontend/   React + TypeScript (Vite) - deployed on Vercel
backend/    Java + Spring Boot REST API - not yet deployed
```

See `frontend/README.md` for frontend-specific setup details.

## Current status

The frontend and backend are being built in parallel but are **not yet connected**, the frontend runs entirely on a mock service layer today. Connecting them (swapping the mock services for real HTTP calls to the Spring Boot API) is the next major step in the project.

### Frontend

- React 19 + TypeScript, Vite, Tailwind CSS v4, React Router v7
- Zustand for state (cart persists in `localStorage`, auth store tracks a JWT-shaped token/user)
- Typed service layer + custom hooks, with real loading/error/success states
- Forms with React Hook Form + Zod, server-style field-error mapping
- Protected routes, a 404 page, and an error boundary
- A typed API contract layer (pagination envelope, error shape) mirroring the backend's DTOs, ready for the real API
- Custom design system (colors, fonts)

### Backend

- Java 17 + Spring Boot 3, layered architecture (Controller, Service, Repository), JPA/Hibernate (H2 for now, Postgres planned)
- REST endpoints for products, orders, and authentication, with DTOs kept separate from entities
- JWT-based authentication with role-based authorisation (customer vs. admin)
- Server-side validation (Bean Validation) with a consistent JSON error envelope
- Pagination for product listings
- Rate limiting on login/register (Bucket4j)
- A few real bugs found and fixed along the way: an object-level authorisation (IDOR) issue that let a logged-in user place an order under someone else's account, and an order-integrity issue where prices weren't frozen at purchase time and stock wasn't checked before an order was placed (both fixed with a transactional, atomic approach)

Not yet built: automated tests, deployment, and payments.

## What's next

- [ ] Admin: promote a user to admin, and paginate the admin orders view
- [ ] Database migrations
- [ ] Automated tests
- [ ] Deploy the backend and connect it to the deployed frontend (currently mock data only)
- [ ] Checkout flow + real payments (Stripe)
- [ ] If all goes well, actually launch it as a real shop
