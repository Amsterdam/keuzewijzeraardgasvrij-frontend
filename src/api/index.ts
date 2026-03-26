import { env } from "@/config/env";
import { ApiClient } from "./ApiClient";

export const apiClient = new ApiClient({
  baseUrl: env.VITE_APP_URL,
  headers: {
    Accept: "application/json",
  },
});
