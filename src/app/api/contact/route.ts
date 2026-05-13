import { NextResponse } from 'next/server';
import * as z from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Upstash Redis & Ratelimit
// Note: These expect UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in environment variables
const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 m'),
  analytics: true,
});

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    // IP-based Rate Limiting
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return new NextResponse(JSON.stringify({ 
        success: false, 
        error: 'Too many requests. Please try again later.' 
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const validatedData = formSchema.safeParse(body);
    
    if (!validatedData.success) {
      // Generic error; no Zod schema leakage
      return new NextResponse(JSON.stringify({ 
        success: false, 
        error: 'Invalid form data provided. Please check your inputs.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Process valid data (e.g. database/email processing)
    // Example: Send email via Resend if configured
    
    return new NextResponse(JSON.stringify({ 
      success: true, 
      message: 'Thank you for your request. Derek will contact you shortly.',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new NextResponse(JSON.stringify({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again later.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
