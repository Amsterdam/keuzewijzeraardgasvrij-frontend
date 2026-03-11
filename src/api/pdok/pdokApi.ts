import { ApiClient } from "../ApiClient";

export const pdokApi = new ApiClient({
  baseUrl: "https://api.pdok.nl/bzk/locatieserver/search/v3_1",
});
