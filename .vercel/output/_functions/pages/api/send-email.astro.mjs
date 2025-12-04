import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({
  request
}) => {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(JSON.stringify({
      message: "Content-Type must be application/json"
    }), {
      status: 400
    });
  }
  const body = await request.json();
  const {
    name,
    email,
    subject,
    message
  } = body;
  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({
      message: "All fields are required"
    }), {
      status: 400
    });
  }
  const resend = new Resend("re_RFkNPQeD_23Bd2FgF4QgASsPkzgAUu7PN");
  try {
    const senderEmail = "contact@swe-rech.site";
    const [adminEmail, userEmail] = await Promise.all([
      // Email to Admin
      resend.emails.send({
        from: `Portfolio Contact <${senderEmail}>`,
        to: ["rechceltoledo@gmail.com"],
        replyTo: email,
        subject: `[Portfolio Contact] ${subject}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `
      }),
      // Auto-reply to User
      resend.emails.send({
        from: `Rechcel Toledo <${senderEmail}>`,
        to: [email],
        subject: `Thanks for reaching out! 🚀`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px; border-radius: 12px;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <h2 style="color: #7c3aed; margin-top: 0;">Hi ${name}! 👋</h2>
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Thanks so much for getting in touch! I've received your message regarding <strong>"${subject}"</strong>.
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                I'm currently reviewing your inquiry and <strong>I will reach out to you very soon</strong>. I typically respond within 24 hours.
              </p>
              
              <div style="margin: 30px 0; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                <h3 style="color: #111827; font-size: 18px;">While you wait...</h3>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
                  I'm <strong>Rechcel Toledo</strong> (aka PHCODESAGE), a Full Stack Developer passionate about building modern, scalable web applications. Feel free to check out more of my work on my portfolio or connect with me on social media.
                </p>
                <div style="margin-top: 15px;">
                  <a href="https://github.com/phcodesage" style="color: #7c3aed; text-decoration: none; margin-right: 15px; font-weight: 600;">GitHub</a>
                  <a href="https://www.linkedin.com/in/rechcel-toledo-589252388/" style="color: #7c3aed; text-decoration: none; margin-right: 15px; font-weight: 600;">LinkedIn</a>
                  <a href="https://www.instagram.com/phcodesage/" style="color: #7c3aed; text-decoration: none; font-weight: 600;">Instagram</a>
                </div>
              </div>

              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Best regards,<br/>
                <strong>Rechcel Toledo</strong><br/>
                <span style="color: #9ca3af;">Full Stack Developer</span>
              </p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
              &copy; ${(/* @__PURE__ */ new Date()).getFullYear()} PHCODESAGE. All rights reserved.
            </div>
          </div>
        `
      })
    ]);
    if (adminEmail.error) {
      console.error("Resend admin email error:", adminEmail.error);
      throw new Error(adminEmail.error.message);
    }
    if (userEmail.error) {
      console.warn("Resend user auto-reply error:", userEmail.error);
    }
    return new Response(JSON.stringify({
      message: "Email sent successfully",
      data: adminEmail.data
    }), {
      status: 200
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({
      message: "Failed to send email",
      error: error.message
    }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
