import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_API_URL ||
      "https://mern-ecommerce-production-4dac.up.railway.app/api",
    credentials: "include",
  }),
  tagTypes: ["Product", "Order", "User", "Category", "Cart", "Favorites"],
  endpoints: () => ({}),
});
