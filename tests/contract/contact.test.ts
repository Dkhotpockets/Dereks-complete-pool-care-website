import { POST as contactHandler } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

describe('Contact API Contract', () => {
  it('should return 400 if name is missing', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        phone: '(631) 555-0123',
        service: 'Maintenance',
        message: 'This is a test message that is long enough.',
      }),
    });

    const res = await contactHandler(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it('should return 200 for valid data', async () => {
    // This will likely fail until the implementation is updated to match the new spec
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(631) 555-0123',
        service: 'Maintenance',
        message: 'This is a test message that is long enough.',
      }),
    });

    const res = await contactHandler(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });
});
