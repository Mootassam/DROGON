import Redis from "ioredis";

 const REDIS_URL = process.env.REDIS_URL || 'redis://:91l3C92VHX9OytcgcV@redis:6379';

// const REDIS_URL = 'redis://localhost:6379' 

export class RedisService {
  private static client: Redis;

  static getClient() {
    if (!this.client) {
      this.client = new Redis(REDIS_URL);

      this.client.on("connect", () => {
        console.log("✅ Redis connected");
      });

      this.client.on("error", (err) => {
        console.error("❌ Redis connection error:", err);
      });
    }

    return this.client;
  }
}
