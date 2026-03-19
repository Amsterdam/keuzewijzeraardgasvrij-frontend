import { ApiClient } from "./ApiClient";

export const apiClient = new ApiClient({
  baseUrl: import.meta.env.VITE_APP_URL,
  headers: {
    Accept: "application/json",
  },
});
