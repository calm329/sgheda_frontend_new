import jwt from "jsonwebtoken";
import sendMail from "lib/sendmail";
import { getServerSession } from "next-auth";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import { authOptions } from "./[...nextauth]";

export default async function (req, res) {
    try {
        // connect database
        await dbConnect();

        // Verify the session
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        // check if the request method is POST
        if (req.method !== "POST")
            throw Error("HTTP method not valid. Only POST accepted!");

        // check if user exists with provided email
        const account = await Account.findOne({ email: session.user.email });
        if (!account)
            return res.status(404).json({ message: "Account not found!" });

        // Check if the limit of resends has been reached
        if (account.resendCount >= 3) {
            return res.status(403).json({ message: "Resend limit reached!" });
        }

        // increment the resendCount and save
        account.resendCount++;
        await account.save();

        // create verification email and store the details
        const emailToken = jwt.sign(
            { accountId: account._id },
            process.env.NEXTAUTH_SECRET,
            { expiresIn: "10m" }
        );

        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/verify?token=${emailToken}`;

        // Send Verification mail
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

        res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
