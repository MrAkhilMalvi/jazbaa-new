import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
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