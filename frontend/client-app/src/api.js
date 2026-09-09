import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:9669";

export const apiUrl = (path) =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

axios.interceptors.request.use((config) => {
  if (
    typeof config.url === "string" &&
    config.url.startsWith("http://localhost:9669")
  ) {
    config.url = apiUrl(config.url.slice("http://localhost:9669".length));
  }
  return config;
});
