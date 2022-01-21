export const config = {
  baseURL: process.env.API_URL as string,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
};
