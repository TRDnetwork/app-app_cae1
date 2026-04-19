import { z } from 'zod';

// Environment variable validation
const envSchema = z.object({
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

const env = envSchema.safeParse(process.env);
const REDIS_URL = env.data?.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = env.data?.UPSTASH_REDIS_REST_TOKEN;

/**
 * Simple rate limiter using Upstash Redis REST API
 * Uses token bucket algorithm via INCR + EXPIRE
 */
export class RateLimiter {
  private readonly limit: number;
  private readonly windowMs: number;
  private readonly redisUrl: string | undefined;
  private readonly token: string | undefined;

  constructor({
    limit = 5,
    windowMs = 3600000, // 1 hour
    redisUrl = REDIS_URL,
    token = REDIS_TOKEN,
  } = {}) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.redisUrl = redisUrl;
    this.token = token;
  }

  /**
   * Check if request is within rate limit
   * Returns true if allowed, false if rate limited
   */
  async isAllowed(identifier: string): Promise<boolean> {
    // If Redis not configured, allow all requests (fail open)
    if (!this.redisUrl || !this.token) {
      console.warn('Rate limiter disabled: Redis not configured');
      return true;
    }

    const key = `rate_limit:${identifier}`;
    const ttl = Math.ceil(this.windowMs / 1000);

    try {
      // Get current count
      const getCountResponse = await fetch(`${this.redisUrl}/get/${key}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      const getCountData = await getCountResponse.json();
      const count = getCountData.result ? parseInt(getCountData.result, 10) : 0;

      if (count >= this.limit) {
        return false;
      }

      // Increment counter
      await fetch(`${this.redisUrl}/incr/${key}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.token}` },
      });

      // Set TTL on first increment
      if (count === 0) {
        await fetch(`${this.redisUrl}/expire/${key}/${ttl}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${this.token}` },
        });
      }

      return true;
    } catch (error) {
      console.error('Rate limiting check failed:', error);
      // Fail open — allow request if Redis is unreachable
      return true;
    }
  }
}