const url = import.meta.env.VITE_API_BASE_URL

if (!url) {
  throw new Error("VITE_API_BASE_URL is missing. Add it to your .env file!")
}

export const API_BASE_URL = url






