import argon from "argon2";
import jwt from "jsonwebtoken";
import sendMail from "lib/sendmail";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";

export default async function (req, res) {
    try {
        // connect database
        await dbConnect();

        // check request method POST or not
        if (req.method !== "POST")
            throw Error("HTTP method not valid only POST Accepted!");

        // check req body empty
        if (!req.body)
            return res.status(404).json({ message: "Don't have form data!" });
        const { name, email, password } = req.body;

        // check email already used
        const exist_account = await Account.findOne({ email });
        if (exist_account)
            return res.status(422).json({ message: "Email already in use!" });

        // create user
        const hash = await argon.hash(password);
        const account = await Account.create({
            name,
            email,
            verified: false,
            password: hash,
            balance: 0
        });

        const emailToken = jwt.sign(
            { accountId: account._id },
            process.env.EMAIL_SECRET,
            { expiresIn: "1d" }
        );

        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/verify/?token=${emailToken}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: account.email,
            subject: "Confirm Email",
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
        };

        sendMail(
            account.email,
            "Confirm Email",
            `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
            `Please click this email to confirm your email: <a href="${url}">${url}</a>`
        );

        res.status(200).json({ account });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
