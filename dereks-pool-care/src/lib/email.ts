import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors when API key is not set
let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceRequested: 'Premium' | 'Repair' | 'Other';
  message?: string | undefined;
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, phone, serviceRequested, message } = data;
  const client = getResend();

  // Email to business owner
  const ownerEmail = await client.emails.send({
    from: 'Derek\'s Pool Care <noreply@derekscompletepoolcare.com>',
    to: process.env.BUSINESS_EMAIL || 'info@derekscompletepoolcare.com',
    subject: `New ${serviceRequested} Service Request from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service Requested:</strong> ${serviceRequested}</p>
      ${message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ''}
      <hr />
      <p><em>Submitted at ${new Date().toLocaleString()}</em></p>
    `,
  });

  // Confirmation email to customer
  const customerEmail = await client.emails.send({
    from: 'Derek\'s Complete Pool Care <noreply@derekscompletepoolcare.com>',
    to: email,
    subject: 'Thank you for contacting Derek\'s Complete Pool Care',
    html: `
      <h2>Thank you for your inquiry!</h2>
      <p>Hi ${name},</p>
      <p>We received your request for <strong>${serviceRequested}</strong> service and will get back to you within 24 hours.</p>
      <p>In the meantime, if you need immediate assistance, please call us at <strong>(631) 320-8271</strong>.</p>
      <br />
      <p>Best regards,<br />Derek's Complete Pool Care Team</p>
      <hr />
      <p style="color: #666; font-size: 12px;">
        This is an automated confirmation. Please do not reply to this email.
      </p>
    `,
  });

  return { ownerEmail, customerEmail };
}
