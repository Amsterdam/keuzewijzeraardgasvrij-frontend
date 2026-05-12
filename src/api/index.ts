import { env } from "@/config/env";
import { ApiClient } from "./ApiClient";

console.log("ENV values:", env);

export const apiClient = new ApiClient({
  baseUrl: env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
});
