import Redis from "ioredis";

// You can get the REDIS_URL from your environment variables
const REDIS_URL =
  process.env.REDIS_URL ||
  "redis://127.0.0.1:6379";

export const connection = new Redis(REDIS_URL, { maxRetriesPerRequest: null });


