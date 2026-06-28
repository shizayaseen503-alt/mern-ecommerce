# StyleHub MERN Store

A production-ready MERN e-commerce app with customer shopping flow, admin inventory management, authentication, payments, and file uploads.

## What is included

- Customer storefront and product browsing
- Cart, favorites, checkout, and order history
- Admin dashboard for products, categories, orders, and analytics
- JWT authentication and protected routes
- Image upload support and API health checks

## Tech stack

- Frontend: React, Vite, Redux Toolkit, React Router, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer
- Deployment: Netlify for frontend, Railway or any Node host for backend

## Run locally

```bash
npm install
npm run install-all
npm run dev
```

The root script starts the backend and frontend together.

## Environment variables

Create a backend .env file with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=super-long-secret-key-at-least-24-chars
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

## Build and verify

```bash
npm run build
node backend/testAPI.mjs
```

## Deployment notes

- Frontend: Netlify build command `npm run build`, publish directory `frontend/dist`
- Backend: Railway or similar Node host, start command `npm start`
- Set the same environment variables on the hosting platform
- For frontend production requests, use `/api` so the Netlify proxy handles routing
