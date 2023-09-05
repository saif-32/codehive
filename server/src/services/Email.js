import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
    }
})

export async function verifyUserEmail(firstName, lastName, email, username, token) {
    try {
        console.log("Sending Email.");
        let info = await transporter.sendMail({
            from: "postmaster@sandboxbadcff628d1c4212ad26569843a2da28.mailgun.org",
            to: email,
            subject: "CodeHive Verification",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
                    <h2 style="color: #333333;">Dear ${firstName} ${lastName},</h2>
                    <p style="color: #333333;">Thank you for registering with CodeHive! Please click the link below to verify your email:</p>
                    <a href="http://localhost:3000/verify-email/${username}/${token}" style="display: inline-block; background-color: #C07F00; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px;">Verify Email</a>
                    <p style="color: #333333;">If the above link doesn't work, you can copy and paste the following URL into your browser:</p>
                    <p style="color: #333333; font-weight: bold;">http://localhost:3000/verify-email/${username}/${token}</p>
                    <p style="color: #333333;">Thank you for joining our community!</p>
                    <p style="color: #333333;">Best regards,<br/>CodeHive Team</p>
                </div>
            `,
        });
    } catch (err) {
        console.log(err);
    }
}

export async function sendPasswordResetEmail(email, username, token) {
    try {
        console.log("Sending email...")
        let info = await transporter.sendMail({
            from: 'postmaster@sandboxbadcff628d1c4212ad26569843a2da28.mailgun.org',
            to: email,
            subject: 'CodeHive Password Reset',
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
                    <h2 style="color: #333333;">Hello ${username},</h2>
                    <p style="color: #333333;">We received a request to reset your password for the CodeHive account associated with this email address. If you did not request this change, please ignore this email.</p>
                    <p style="color: #333333;>To proceed with the password reset, please click the button below:</p>
                    <a href="http://localhost:3000/change-password/${username}/${token}" style="display: inline-block; background-color: #C07F00; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 10px;">Reset Password</a>
                    <p style="color: #333333;">If the above link doesn't work, you can copy and paste the following URL into your browser:</p>
                    <p style="color: #333333; font-weight: bold;">http://localhost:3000/change-password/${username}/${token}</p>
                    <p style="color: #333333;">Best regards,<br/>CodeHive Team</p>
                </div>
            `,
        });
    } catch (err) {
        console.log(err)
    }
}