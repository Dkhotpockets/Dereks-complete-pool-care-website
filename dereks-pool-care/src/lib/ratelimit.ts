import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Type for rate limit response
export type RateLimitResponse = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

// Create a simple in-memory rate limiter fallback for development
class InMemoryRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limitCount: number;
  private window: number;

  constructor(limitCount: number, window: number) {
    this.limitCount = limitCount;
    this.window = window;
  }

  async limit(identifier: string): Promise<RateLimitResponse> {
    const now = Date.now();
    const timestamps = this.requests.get(identifier) || [];

    // Remove timestamps outside the window
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < this.window
    );

    if (validTimestamps.length >= this.limitCount) {
      return {
        success: false,
        limit: this.limitCount,
        remaining: 0,
        reset: Math.min(...validTimestamps) + this.window,
      };
    }

    validTimestamps.push(now);
    this.requests.set(identifier, validTimestamps);

    return {
      success: true,
      limit: this.limitCount,
      remaining: this.limitCount - validTimestamps.length,
      reset: now + this.window,
    };
  }
}

// Use Upstash Redis if configured, otherwise use in-memory fallback
export const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 requests per hour
        analytics: true,
        prefix: '@dereks-pool-care/contact',
      })
    : new InMemoryRateLimiter(3, 60 * 60 * 1000); // 3 requests per hour
