import nodemailer from 'nodemailer'
export const sendMail = async ( recipientEmail,verificationToken) => {
  try {
    

    var transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: 'thsiisrkrkr@gmail.com',
      to: recipientEmail,
      subject: 'Verify Your Email',
      html: `
        <p>Hello,</p>
        <p>Thank you for signing up. Please click the following link to verify your email address:</p>
        <a href="http://localhost:8000/api/v1/auth/verify?token=${verificationToken}">Verify Email</a>
        <p>If you did not sign up for an account, you can ignore this email.</p>
        <p>Regards,<br>InnovateHub Team</p>
      `
    };

    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (error) { 
    console.log('Error in nodemailer: ' + error);
  }
};