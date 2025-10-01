import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/email';
import { ratelimit } from '@/lib/ratelimit';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone must be in format (XXX) XXX-XXXX'),
  serviceRequested: z.enum(['Premium', 'Repair', 'Other']),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later or call us at (631) 320-8271.',
          rateLimit: {
            limit,
            remaining,
            reset: new Date(reset).toISOString(),
          },
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate request data
    const validatedData = contactSchema.parse(body);

    // Add timestamp
    const submission = {
      ...validatedData,
      submittedAt: new Date().toISOString(),
    };

    // Log submission for debugging
    console.log('Contact form submission:', submission);

    // Send email notifications if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await sendContactEmail(validatedData);
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue even if email fails - we still want to acknowledge the submission
      }
    } else {
      console.warn('RESEND_API_KEY not configured - emails will not be sent');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will respond within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred. Please try again or call us at (631) 320-8271.',
      },
      { status: 500 }
    );
  }
}
