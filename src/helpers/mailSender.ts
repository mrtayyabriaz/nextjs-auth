import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'

const MailSend = async ({ usermail, mailType, userID = '' }: any) => {
  console.log(userID);

  const hashTokan = await bcryptjs.hash(userID, 10)
  // console.log('hashTokan: ', hashTokan);

  if (mailType == "VERIFY") {
    await User.findByIdAndUpdate(userID, {
      $set: {
        verifyToken: hashTokan,
        verifyTokenExpiry: Date.now() + 3600000
      }
    })

  } else if (mailType == "RESET") {
    await User.findByIdAndUpdate(userID, {
      $set: {
        forgotPasswordToken: hashTokan,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      }
    })

  }


  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  const mailOptions = {
    from: "auth@test.com",
    to: usermail,
    subject: mailType === 'VERIFY' ? "Verify your account" : "Reset your password",
    html: mailType == "VERIFY" ?
      `<div><a href='${process.env.DOMAIN}/verifyemail?token=${hashTokan}'>Click to Verify email</a> or copy link to browser ${process.env.DOMAIN}/verifyemail?token=${hashTokan} </div>`
      :
      `<div><a href='${process.env.DOMAIN}/reset?token=${hashTokan}'>Click to Reset Password</a> or copy link to browser ${process.env.DOMAIN}/reset?token=${hashTokan} </div>`
  }

  const mailResponse = await transporter.sendMail(mailOptions);
  if (mailResponse.accepted.length > 0) {
    console.log('mail sent successfully');
    return 'mail sent successfully';
  } else {
    console.log('mail not send');
  }
}


export default MailSend;