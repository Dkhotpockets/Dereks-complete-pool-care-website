import { NextResponse } from 'next/server';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validatedData = formSchema.safeParse(body);
    
    if (!validatedData.success) {
      return new NextResponse(JSON.stringify({ 
        success: false, 
        error: 'Validation failed', 
        details: validatedData.error.flatten().fieldErrors 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Simulate database/email processing
    // In a real app, you would use Resend or similar here
    
    return new NextResponse(JSON.stringify({ 
      success: true, 
      message: 'Thank you for your request. Derek will contact you shortly.',
      data: {
        submissionId: crypto.randomUUID()
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new NextResponse(JSON.stringify({ 
      success: false, 
      error: 'An unexpected error occurred. Please call us at (631) 320-8271.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
