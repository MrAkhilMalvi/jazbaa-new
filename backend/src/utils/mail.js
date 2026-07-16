import { Resend } from "resend";

// Quick check to alert you if your Render environment variables are missing
if (!process.env.RESEND_API_KEY) {
  console.error("❌ CRITICAL PRODUCTION ERROR: RESEND_API_KEY environment variable is missing!");
}

// Initialize the Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a password reset email via Resend HTTPS API
 * @param {string} email - Recipient's email address
 * @param {string} link - The complete secure reset link containing the token
 */
export const sendResetEmail = async (email, link) => {
  console.log(`[Resend Mailer] Dispatching reset token link to: ${email}`);
  
  // Production Dynamic Sender: Uses your environment variable, or falls back safely
  const senderEmail = process.env.EMAIL_FROM || "Team Jazbaa <onboarding@resend.dev>";

  try {
    const { data, error } = await resend.emails.send({
      from: senderEmail, 
      to: [email],
      subject: "Reset your Jazbaa password",
      // Prevents email threading issues in customer inboxes
      headers: {
        "X-Entity-Ref-ID": Math.random().toString(36).substring(2),
      },
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

    if (error) {
      throw error;
    }

    console.log(`[Resend Mailer] Email accepted by Resend server. Message ID: ${data.id}`);
    return data;
  } catch (error) {
    console.error("❌ [Resend Mailer Exception] Failed to execute API call:", error);
    throw error;
  }
};