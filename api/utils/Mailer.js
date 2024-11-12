import nodemailer from 'nodemailer';

// Create the nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,  // Use environment variables for security
    pass: 'lovj piaa ibwo opwj',
  },
});

// Function to send emails
const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: 'shoyabkhan.smartdata@gmail.com',
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMail;
