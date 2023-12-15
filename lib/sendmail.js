import { google } from "googleapis";
import nodemailer from "nodemailer";

export default async function sendMail(receiver, subject, text, html) {
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = await oauth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.GMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken.token
        }
    });

    let mailOptions = {
        from: process.env.GMAIL,
        to: receiver,
        subject,
        text,
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return { success: false, message: error.message };
        } else {
            return { success: true };
        }
    });
}
