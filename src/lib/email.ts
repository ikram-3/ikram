import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/**
 * Creates and returns a configured Nodemailer transport using Gmail SMTP.
 */
function getEmailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "ikram.dataengineer.info@gmail.com";
  const pass = (process.env.SMTP_PASS || "fbhtlgrqkjntvmvk").replace(/\s+/g, "");

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends notification email to Muhammad Ikram and confirmation auto-reply to the sender.
 */
export async function sendContactEmail(payload: ContactEmailPayload) {
  const transporter = getEmailTransporter();
  const notificationRecipient =
    process.env.CONTACT_NOTIFICATION_EMAIL || "ikram.dataengineer.info@gmail.com";
  const fromAddress =
    process.env.EMAIL_FROM || "Muhammad Ikram <ikram.dataengineer.info@gmail.com>";

  const sanitizedSubject = payload.subject?.trim() || "New message from Portfolio Contact Form";
  const timeString = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
    dateStyle: "full",
    timeStyle: "short",
  });

  // 1. Notification email to Ikram
  const adminMailOptions = {
    from: fromAddress,
    to: notificationRecipient,
    replyTo: `${payload.name} <${payload.email}>`,
    subject: `[Portfolio Inquiry] ${sanitizedSubject} — from ${payload.name}`,
    text: `New Portfolio Message received from ${payload.name} (${payload.email}):\n\nSubject: ${sanitizedSubject}\nTime: ${timeString} (PKT)\n\nMessage:\n${payload.message}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f13; color: #e5e7eb; margin: 0; padding: 24px; }
          .card { max-width: 600px; margin: 0 auto; background: #13181f; border: 1px solid #2d3748; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%); padding: 24px; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; }
          .header p { margin: 6px 0 0; font-size: 13px; color: #ffedd5; }
          .content { padding: 24px; }
          .field { margin-bottom: 16px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; font-weight: 600; margin-bottom: 4px; }
          .field-value { font-size: 15px; color: #f9fafb; font-weight: 500; }
          .message-box { background: #0c1015; border-left: 3px solid #ea580c; border-radius: 6px; padding: 16px; margin-top: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #f3f4f6; }
          .footer { padding: 18px 24px; background: #0c1015; border-top: 1px solid #1f2937; text-align: center; font-size: 12px; color: #6b7280; }
          .btn { display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); color: #ffffff !important; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>New Client Inquiry</h1>
            <p>Sent via Muhammad Ikram Portfolio Contact Portal</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Sender Name</div>
              <div class="field-value">${payload.name}</div>
            </div>
            <div class="field">
              <div class="field-label">Sender Email</div>
              <div class="field-value"><a href="mailto:${payload.email}" style="color: #fb923c; text-decoration: none;">${payload.email}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${sanitizedSubject}</div>
            </div>
            <div class="field">
              <div class="field-label">Received At</div>
              <div class="field-value" style="font-size: 13px; color: #9ca3af;">${timeString} (PKT)</div>
            </div>
            <div class="field">
              <div class="field-label">Message Content</div>
              <div class="message-box">${payload.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>
            <div style="text-align: center;">
              <a href="mailto:${payload.email}?subject=Re:%20${encodeURIComponent(sanitizedSubject)}" class="btn">
                Reply to ${payload.name}
              </a>
            </div>
          </div>
          <div class="footer">
            Muhammad Ikram · Software Engineer · Swat, Pakistan
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // 2. Confirmation auto-reply to the user
  const userMailOptions = {
    from: fromAddress,
    to: payload.email,
    subject: `Thank you for reaching out, ${payload.name} | Muhammad Ikram`,
    text: `Hi ${payload.name},\n\nThank you for reaching out. I have received your message regarding "${sanitizedSubject}" and will get back to you within 24 hours.\n\nBest regards,\nMuhammad Ikram\nSoftware Engineer · Full-Stack × Applied AI × Automation\nEmail: ikram.dataengineer.info@gmail.com\nPhone: +92 349 9934605`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f13; color: #e5e7eb; margin: 0; padding: 24px; }
          .card { max-width: 600px; margin: 0 auto; background: #13181f; border: 1px solid #2d3748; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%); padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; }
          .header p { margin: 6px 0 0; font-size: 13px; color: #ffedd5; }
          .content { padding: 28px 24px; line-height: 1.6; }
          .greeting { font-size: 16px; font-weight: 600; color: #f9fafb; margin-bottom: 12px; }
          .text { font-size: 14px; color: #d1d5db; margin-bottom: 16px; }
          .copy-box { background: #0c1015; border-left: 3px solid #ea580c; border-radius: 6px; padding: 14px 16px; margin: 18px 0; font-size: 13px; color: #9ca3af; }
          .signature { border-top: 1px solid #1f2937; padding-top: 18px; margin-top: 24px; }
          .sig-name { font-size: 15px; font-weight: 700; color: #ea580c; }
          .sig-title { font-size: 12px; color: #9ca3af; margin-top: 2px; }
          .footer { padding: 16px 24px; background: #0c1015; border-top: 1px solid #1f2937; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Message Received</h1>
            <p>Muhammad Ikram — Software Engineer</p>
          </div>
          <div class="content">
            <div class="greeting">Hi ${payload.name},</div>
            <p class="text">
              Thank you for getting in touch. I have successfully received your inquiry regarding <strong>"${sanitizedSubject}"</strong>.
            </p>
            <p class="text">
              I review all project briefs and inquiries personally and will respond with relevant details or initial scope within <strong>24 business hours</strong>.
            </p>
            <div class="copy-box">
              <strong style="color: #e5e7eb; display: block; margin-bottom: 6px;">Your submitted inquiry:</strong>
              ${payload.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>
            <div class="signature">
              <div class="sig-name">Muhammad Ikram</div>
              <div class="sig-title">Software Engineer · Full-Stack × Applied AI × Automation</div>
              <div class="sig-title">KPITB Generative AI Fellow · Swat, Pakistan</div>
              <div class="sig-title" style="margin-top: 6px;">
                Email: <a href="mailto:ikram.dataengineer.info@gmail.com" style="color: #fb923c; text-decoration: none;">ikram.dataengineer.info@gmail.com</a> · Phone: +92 349 9934605
              </div>
            </div>
          </div>
          <div class="footer">
            This is an automated confirmation verifying your message was delivered securely.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // Dispatch both emails in parallel
  const [adminResult, userResult] = await Promise.allSettled([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions),
  ]);

  if (adminResult.status === "rejected") {
    console.error("Failed to deliver admin notification email:", adminResult.reason);
    throw new Error(
      adminResult.reason?.message || "Failed to deliver contact notification email via SMTP"
    );
  }

  if (userResult.status === "rejected") {
    console.warn("Failed to deliver user auto-reply email:", userResult.reason);
  }

  return {
    adminDelivered: adminResult.status === "fulfilled",
    userDelivered: userResult.status === "fulfilled",
  };
}
