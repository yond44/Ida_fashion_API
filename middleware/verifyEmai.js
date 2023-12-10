const nodemailer = require("nodemailer");

const verifyEmail = async (email, link) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "jojobajojojo3@gmail.com",
        pass: "rfkd hazk bdal exqz",
      },
    });
     await transporter.sendMail({
      from: process.env.G_USER,
      to: email,
      subject: "Account Verification",
      html: `
          <div>
          <a href=${link}>Click here to activate your account</a>
          </div>
          `,
    });
    console.log("Mail has been sent");
  } catch (error) {
    console.log(error, "fail to send mail");
  }
};

module.exports = verifyEmail;
