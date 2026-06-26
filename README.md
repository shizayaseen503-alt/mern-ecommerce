# MERN Stack E-Commerce Application

A modern full-stack e-commerce platform built with React.js, Node.js, Express.js, MongoDB, Redux Toolkit, and JWT Authentication. The application provides a complete online shopping experience for customers and a powerful admin dashboard for managing products, categories, users, orders, and analytics.

## Features

### Customer Features

* User Registration and Login
* JWT Authentication and Protected Routes
* Product Browsing with Categories, Search, Filters, and Sorting
* Product Detail Pages
* Shopping Cart Management
* Wishlist / Favorites Functionality
* Checkout and Order Placement
* Order History and Tracking
* User Profile Management
* Profile Image Upload
* Responsive Mobile-Friendly Interface

### Admin Features

* Admin Dashboard
* Product Management (Create, Read, Update, Delete)
* Category Management
* User Management
* Order Management
* Analytics and Reporting
* Secure Admin-Only Routes

### Technical Features

* RESTful API Architecture
* MongoDB Database Integration
* Redux Toolkit State Management
* JWT Authentication and Authorization
* File Upload Support
* Error Handling and Validation
* Loading States and Empty-State Handling
* Fallback Image Handling
* Production-Ready Build Configuration

## Technologies Used

### Frontend

* React.js
* Redux Toolkit
* React Router
* Vite
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (File Uploads)

### Payment

* PayPal Integration

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd app
```

### Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

## Running the Application

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

### Run Both (if configured)

```bash
npm run dev
```

## Production Build

```bash
cd frontend
npm run build
```

## Testing & Validation

### API Verification

```bash
cd backend
node testAPI.mjs
```

### Validation Results

* API Tests Passed: 10/10
* Frontend Production Build Successful
* Authentication Verified
* Product Catalog Verified
* Checkout Flow Verified
* Admin Dashboard Verified

### Validation Note

There is currently no root-level `npm test` script defined in the project's `package.json`.

Project validation was performed using the repository's existing build and API verification commands rather than a generic test command.

## Project Structure

```text
app/
├── backend/
├── frontend/
├── package.json
└── README.md
```

## Future Improvements

* Product Reviews and Ratings
* Coupon and Discount System
* Email Notifications
* Advanced Analytics
* Multi-Vendor Marketplace Support
* Real-Time Order Updates
* Product Recommendations

## Screenshots

Add screenshots here after deployment:

* Home Page
* Product Listing Page
* Product Details Page
* Cart Page
* Checkout Page
* User Dashboard
* Admin Dashboard
* Analytics Page

## Deployment

Frontend (Netlify):

* Build command: npm run build
* Publish directory: frontend/dist
* Add environment variable: VITE_API_URL=https://mern-ecommerce-production-4dac.up.railway.app/api

Backend (Railway):

* Start command: npm start
* Add environment variables:
  * PORT=5000
  * MONGO_URI=your_mongodb_connection_string
  * JWT_SECRET=your_super_secret_jwt_key_at_least_24_characters
  * FRONTEND_URL=https://stylehub-mern.netlify.app
  * CORS_ORIGIN=https://stylehub-mern.netlify.app
  * PAYPAL_CLIENT_ID=your_paypal_client_id

Database:

* MongoDB Atlas

## Author

**Shiza Yaseen**

Full Stack MERN Developer

Built with React, Node.js, Express.js, MongoDB, Redux Toolkit, and JWT Authentication.
