import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: 'postmaster@sandboxbadcff628d1c4212ad26569843a2da28.mailgun.org',
        pass: '53fbe41d26ee65a5626ed2b4813cf918-6d1c649a-38f0f4b2'
    }
})

export async function verifyUserEmail(firstName, lastName, email, username, token) {
        try {
            console.log("Sending Email.")
            let info = await transporter.sendMail({
                from: "postmaster@sandboxbadcff628d1c4212ad26569843a2da28.mailgun.org",
                to: email,
                subject: "CodeHive Verification",
                html: "http://localhost:3000/verify-email/" + username + "/" + token,
            })
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
            html: "http://localhost:3000/change-password/" + username + "/" + token,
        })
    } catch (err) {
        console.log(err)
    }
}