// ✨ FIXED: Changed the underscore (_) to a forward slash (/) in the package path
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// Use the backend API prefix by default so requests hit /api/products, /api/categories, etc.
// In local development Vite's proxy forwards these to the Express server.
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // Essential for forwarding authentication cookies
  }),
  tagTypes: ["Product", "Order", "User", "Category", "Cart", "Favorites"],
  endpoints: () => ({}),
});
