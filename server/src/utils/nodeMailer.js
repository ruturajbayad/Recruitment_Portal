import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const mailer = (email, userID, token) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "bayadruturaj5@gmail.com",
      pass: process.env.EMIL_PASS,
    },
  });

  var mailOptions = {
    from: {
      name: "Ruturaj Bayad 😎",
      address: "bayadruturaj5@gmail.com",
    },
    to: `${email}`,
    subject: "Reset Password Link",
    text: "Please click below Reset Button to get redirected 🚀 to reset password page : ",
    html: `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
      <p> Please click below Reset Button to get redirected 🚀 to reset password page : </p>
      <br/>
      <tr/>
      <tr>
        <td align="center" bgcolor="#ffffff" style="padding: 20px 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
            <tr>
              <td align="center" bgcolor="#007bff" style="padding: 15px 30px; border-radius: 5px;">
                <a href="http://localhost:3000/auth/reset-password/${userID}/${token}" target="_blank" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; display: inline-block;">Reset Password</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>`,
  };
  var result;
  transporter.sendMail(
    mailOptions,
    (result = function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return info.response;
      }
    })
  );
  return result;
};
