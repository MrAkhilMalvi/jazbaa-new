import nodemailer from "nodemailer";

// Simple validation to help you debug in your live server logs
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️ WARNING: EMAIL_USER or EMAIL_PASS environment variables are missing!");
}

export const transporter = nodemailer.createTransport({
  // 🌟 FIXED FOR RENDER: Using Google's direct IPv4 SMTP server address.
  // This completely bypasses Render's internal DNS resolving to an unreachable IPv6 address.
  host: "74.125.142.108", 
  port: 587,            // 🌟 PORT 587: Much more open and cloud-friendly than 465 on Render
  secure: false,         // Must be false for port 587 (upgrades securely via STARTTLS)
  pool: true,            // Keeps connections open for faster, reliable delivery in production
  
  // ⏱️ TIMEOUT PROTECTION: Stops the server from hanging indefinitely if blocked
  connectionTimeout: 10000, // 10 seconds max to connect
  greetingTimeout: 10000,   // 10 seconds max to greet server
  socketTimeout: 15000,     // 15 seconds max for inactivity
  
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Make sure this is your 16-character Google App Password
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
    // 🌟 Crucial when using a direct IP instead of a hostname:
    // This tells Nodemailer to expect the matching gmail.com certificate.
    servername: "smtp.gmail.com" 
  },
});

/**
 * Sends a password reset email to the user
 * @param {string} email - Recipient's email address
 * @param {string} link - The complete reset link containing the token
 */
export const sendResetEmail = async (email, link) => {
  console.log(`[Email Service] Attempting to send reset link to: ${email}`);
  
  try {
    const info = await transporter.sendMail({
      from: `"Team Jazbaa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your Jazbaa password",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 30px 20px; color: #333333; line-height: 1.6;">
          <p style="font-size: 16px; margin-bottom: 20px;">👋 Hi there!</p>
          
          <p style="font-size: 16px; margin-bottom: 25px;">We received a request to reset your <strong>Jazbaa</strong> password.</p>
          
          <p style="font-size: 16px; margin-bottom: 25px;">Tap the secure link below to create a new one:</p>
          
          <div style="margin: 30px 0; text-align: left;">
            <a href="${link}" style="background-color: #FFD700; color: #000000; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              🔗 Reset Password
            </a>
          </div>

          <p style="font-size: 14px; color: #666666; margin-bottom: 15px;">
            🛡️ For your security, this link is valid for <strong>60 minutes</strong> and can only be used once.
          </p>
          
          <p style="font-size: 14px; color: #666666; margin-bottom: 30px;">
            If this wasn't you, no action is needed—your password hasn't been changed.
          </p>
          
          <p style="font-size: 15px; margin-bottom: 0;">We're here if you need any help. 💛</p>
          <p style="font-size: 15px; margin-top: 5px; margin-bottom: 25px; color: #555555;">Helping you get back to what matters.</p>
          
          <p style="font-size: 15px; margin-bottom: 0; font-weight: 600;">Warm regards,</p>
          <p style="font-size: 15px; margin-top: 2px; color: #555555;">Team Jazbaa</p>
          
          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />
          
          <p style="color: #999999; font-size: 12px; line-height: 1.4;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <span style="color: #0066cc; word-break: break-all;">${link}</span>
          </p>
        </div>
      `,
    });

    console.log(`[Email Service] Email sent successfully! Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("[Email Service] Failed to send email:", error);
    throw error;
  }
};