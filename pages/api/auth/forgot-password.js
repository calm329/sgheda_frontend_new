import jwt from "jsonwebtoken";
import sendMail from "lib/sendmail";
import { getServerSession } from "next-auth";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import { authOptions } from "./[...nextauth]";

export default async function (req, res) {
    try {
        // connect to the database
        await dbConnect();

        // check if the request method is POST
        if (req.method !== "POST")
            throw Error("HTTP method not valid. Only POST accepted!");

        const { email } = req.body;

        // Check if user exists with provided email
        const account = await Account.findOne({ email: email });
        if (!account)
            return res.status(404).json({ message: "Account not found!" });

        // Checks if the account has a password set
        if (!account.password)
            return res.status(400).json({
                message: "Google accounts don't support password reset."
            });

        // create password reset token and store the details
        const resetToken = jwt.sign(
            { accountId: account._id },
            process.env.NEXTAUTH_SECRET,
            { expiresIn: "1h" }
        );

        account.passwordResetToken = resetToken;
        await account.save();

        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/reset-password?token=${resetToken}`;

        // Send reset password mail
        await sendMail(
            account.email,
            "Password Reset for SGHEDA",
            `Dear ${account.name},

You have requested a password reset. 

Please click on the following link or copy and paste it into your browser to complete the process:

${url}

If you did not request this reset, please ignore this email and your password will remain the same. 

Best regards,
SGHEDA`,
            `<p>Dear ${account.name},</p>

<p>You have requested a password reset.</p>

<p>Please click on the following link or copy-paste it in your browser to complete the process:</p>

<a href="${url}" target="_blank">Reset Password</a>

<p>If you did not request this reset, please ignore this email and your password will remain the same.</p>

<p>Best regards,</p>
<p>SGHEDA</p>`
        );

        res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
