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
            process.env.NEXTAUTH_SECRET,
            { expiresIn: "1d" }
        );

        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/verify/?token=${emailToken}`;

        sendMail(
            account.email,
            "Activate your Account For SGHEDA",
            `Dear ${account.name},

Thank you for registering an account on our platform.

To activate your account, please click on the following link or copy-paste it in your browser:

${url}

If you did not register this account, please ignore this email.

Best regards,
SGHEDA`,
            `<p>Dear ${account.name},</p>

<p>Thank you for registering an account on our platform.</p>

<p>To activate your account, please click on the following link or copy-paste it in your browser:</p>

<a href="${url}" target="_blank">Click Here</a>

<p>If you did not register this account, please ignore this email.</p>

<p>Best regards,</p>
<p>SGHEDA</p>`
        );

        res.status(200).json({ account });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
