import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, projectType, message, honeypot } = body;

    // Silent rejection for automated spambots filling the hidden field
    if (honeypot) {
      return NextResponse.json(
        { success: true, message: "Message sent successfully!" },
        { status: 200 }
      );
    }

    // Input validations
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 3) {
      return NextResponse.json(
        { error: "Message must be at least 3 characters." },
        { status: 400 }
      );
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 150);
    const cleanProjectType = typeof projectType === "string" ? projectType.trim().slice(0, 100) : "General Inquiry";
    const cleanMessage = message.trim().slice(0, 5000);

    const gmailUser = (process.env.GMAIL_USER || "muhammadrony147@gmail.com").trim();
    const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");

    if (!gmailAppPassword) {
      console.error("[Contact API] Missing GMAIL_APP_PASSWORD in environment variables.");
      return NextResponse.json(
        {
          error:
            "Email service is not configured yet. Please ensure GMAIL_APP_PASSWORD is set.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const isGreeting = cleanProjectType.toLowerCase().includes("hi") || cleanProjectType.toLowerCase().includes("chat");
    const subject = isGreeting
      ? `👋 Quick Hello from ${cleanName} via Portfolio`
      : `🚀 Portfolio Inquiry [${cleanProjectType}] from ${cleanName}`;

    const textContent = [
      `New message from your portfolio contact form:`,
      `-----------------------------------------`,
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Project / Topic: ${cleanProjectType}`,
      `-----------------------------------------`,
      `Message:`,
      cleanMessage,
      `-----------------------------------------`,
      `Hit Reply to directly answer ${cleanEmail}.`,
    ].join("\n");

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0f14; border: 1px solid #232936; border-radius: 12px; overflow: hidden; color: #e5e5e5;">
        <div style="background: #141a24; padding: 20px 24px; border-bottom: 1px solid #232936;">
          <h2 style="margin: 0; font-size: 18px; color: #ffffff; font-weight: 600;">
            ${isGreeting ? "👋 New Message Received" : "🚀 New Project Inquiry"}
          </h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #8b949e;">Sent from RH.RONY Portfolio Contact Terminal</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #8b949e; font-size: 13px; width: 120px; text-transform: uppercase; font-family: monospace;">From:</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 15px; font-weight: 500;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8b949e; font-size: 13px; text-transform: uppercase; font-family: monospace;">Email:</td>
              <td style="padding: 8px 0; font-size: 15px;">
                <a href="mailto:${cleanEmail}" style="color: #5bc0be; text-decoration: none;">${cleanEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8b949e; font-size: 13px; text-transform: uppercase; font-family: monospace;">Topic:</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">
                <span style="display: inline-block; background: #1f2737; color: #a1cca5; padding: 3px 10px; border-radius: 9999px; font-size: 12px; font-weight: 500; border: 1px solid rgba(161,204,165,0.2);">
                  ${cleanProjectType}
                </span>
              </td>
            </tr>
          </table>

          <div style="background: #12161f; border-left: 3px solid #5bc0be; border-radius: 4px; padding: 16px; margin-top: 12px;">
            <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #8b949e; font-family: monospace;">Message Body:</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #f0f6fc; white-space: pre-wrap;">${cleanMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #232936; display: flex; align-items: center; justify-content: space-between;">
            <p style="margin: 0; font-size: 12px; color: #8b949e;">
              Hit <strong>Reply</strong> to respond directly to <a href="mailto:${cleanEmail}" style="color: #5bc0be; text-decoration: underline;">${cleanEmail}</a>.
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${cleanName}" <${gmailUser}>`,
      to: gmailUser,
      replyTo: cleanEmail,
      subject,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Contact API] Error sending email:", errorMessage);
    return NextResponse.json(
      {
        error: "Failed to send email. Please try again or reach out directly.",
      },
      { status: 500 }
    );
  }
}
