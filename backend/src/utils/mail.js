import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  // Instead of service: "gmail", explicit configuration gives us more control
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465
  family: 4,    // 🔥 CRITICAL: Forces Node to use IPv4 instead of failing on IPv6
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (email, link) => {
  console.log("Sending email to:", email);
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Password",
    html: `
      <h2>Password Reset</h2>
      <p>Click below link to reset password:</p>

      <a href="${link}">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    `,
  });
};