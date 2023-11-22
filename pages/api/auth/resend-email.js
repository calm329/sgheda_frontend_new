import jwt from "jsonwebtoken";
import sendMail from "lib/sendmail";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";

export default async function (req, res) {
    try {
        // connect database
        await dbConnect();

        // check if the request method is POST
        if (req.method !== "POST")
            throw Error("HTTP method not valid. Only POST accepted!");

        // check if req body is empty
        if (!req.body)
            return res.status(404).json({ message: "Form data not provided!" });

        const { email } = req.body;

        // check if user exists with provided email
        const account = await Account.findOne({ email });
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
            process.env.EMAIL_SECRET,
            { expiresIn: "1d" }
        );

        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/verify?token=${emailToken}`;

        // Send Verification mail
        sendMail(
            account.email,
            "Confirm Email",
            `Please click this email to confirm your email: <a href="${url}">${url}</a>`
        );

        res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
