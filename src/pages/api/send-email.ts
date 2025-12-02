import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') !== 'application/json') {
    return new Response(JSON.stringify({ message: 'Content-Type must be application/json' }), {
      status: 400,
    });
  }

  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), {
      status: 400,
    });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain later
      to: [import.meta.env.CONTACT_EMAIL], // Your email to receive messages
      replyTo: email, // Visitor's email for easy replies
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ message: 'Email sent successfully', data }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email', error: (error as Error).message }), {
      status: 500,
    });
  }
};
