import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const scheduleMailerforInterviewer = (
  email,
  dateOfInterview,
  timeOfIntreview,
  candidateName,
  interviewerName
) => {
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
      name: "HR Prishusoft",
      address: "bayadruturaj5@gmail.com",
    },
    to: `${email}`,
    subject: "Interview Schedule Details",
    // text: "Please click below Reset Button to get redirected 🚀 to reset password page : ",
    html: `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding: 20px 0;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); border-radius: 10px;">
            <!-- Header -->
            <tr>
              <td align="center" bgcolor="#007bff" style="padding: 20px 0; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">HR Prishusoft</h1>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding: 40px 40px 20px;">
                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0;">
                  Dear ${interviewerName},
                </p>
                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                  You have an upcoming interview scheduled with:
                </p>
                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                  Candidate Name: ${candidateName}
                  <br>
                  Date: ${dateOfInterview}
                  <br>
                  Time: ${timeOfIntreview}
                </p>
                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                  Please ensure you are available and prepared for the interview at the specified date and time.
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td bgcolor="#f9f9f9" style="padding: 20px 40px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0;">
                  <strong>Note:</strong> If you have any questions or concerns, please don't hesitate to contact us.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  
  `,
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
