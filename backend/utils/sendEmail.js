const nodemailer = require("nodemailer");

const sendResetEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  let transporter;
  let fromAddress;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    fromAddress = `"Asktronaut Support" <${testAccount.user}>`;
  } else {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    fromAddress = `"Asktronaut Support" <${process.env.EMAIL_USER}>`;
  }

  try {
    const mailOptions = {
      from: fromAddress,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0A0A0A; color: #E5E7EB; padding: 40px; text-align: center;">
          <h2 style="color: #38BDF8;">Asktronaut</h2>
          <p style="font-size: 16px; margin-bottom: 30px;">You requested a password reset. Click the button below to set a new password, valid for 15 minutes.</p>
          <a href="${resetUrl}" style="background-color: #38BDF8; color: #0A0A0A; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
          <p style="margin-top: 30px; font-size: 14px; color: #6B7280;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Reset email sent successfully to", email);

    // If using ethereal testing, print the link where the user can view the email in their browser
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("\n========================================================");
      console.log("📨 TEST EMAIL INTERCEPTED (NO SMTP CONFIGURED)");
      console.log("Preview the email in your browser here:");
      console.log(nodemailer.getTestMessageUrl(info));
      console.log("========================================================\n");
    }
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Could not send the email");
  }
};

module.exports = { sendResetEmail };
