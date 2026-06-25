// ✨ FIXED: Changed the underscore (_) to a forward slash (/) in the package path
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// Production mein Vercel ke environment variable se URL uthaye ga, local par fallback karega aur proxy use karega
const BASE_URL = import.meta.env.VITE_API_URL || "";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // Essential for forwarding authentication cookies
  }),
  tagTypes: ["Product", "Order", "User", "Category", "Cart", "Favorites"],
  endpoints: () => ({}),
});
