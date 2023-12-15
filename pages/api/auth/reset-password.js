import jwt from "jsonwebtoken";
import argon2 from "argon2";
import crypto from "crypto";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import sendMail from "lib/sendmail";

export default async function (req, res) {
    try {
        // connect to the database
        await dbConnect();

        // Check if method is GET
        if (req.method !== "GET")
            throw new Error("HTTP method not valid. Only GET accepted!");

        const { token } = req.query;

        // verify jwt
        const { accountId } = jwt.verify(token, process.env.NEXTAUTH_SECRET);

        // find the account with the accountId from jwt
        const account = await Account.findById(accountId);
        if (!account)
            return res.status(404).json({ message: "Account not found!" });

        // compare token from jwt with the one in account
        // if (token !== account.passwordResetToken)
        //     return res
        //         .status(403)
        //         .json({ message: "Invalid or expired reset token!" });

        // Generate a strong random password
        const newPassword = crypto
            .randomBytes(8)
            .toString("base64")
            .slice(0, 8) // Cut off extra characters
            .replace(/\+/g, "0") // Replace '+' with '0'
            .replace(/\//g, "0"); // Replace '/' with '0'

        // Hash newPassword using argon2 and set as account's password
        account.password = await argon2.hash(newPassword, {
            type: argon2.argon2id
        });
        account.passwordResetToken = undefined; // clear the reset token
        await account.save(); // save changes

        // Send new password via email
        sendMail(
            account.email,
            "Your new password",
            `Dear ${account.name},
            
Your password has been successfully reset. Your new password is: ${newPassword}
            
Please log in using this password and change it as soon as possible. 

Best regards,
SGHEDA`,
            `<p>Dear ${account.name},</p>
            <p>Your password has been successfully reset. Your new password is: <b>${newPassword}</b></p>
            <p>Please log in using this password and change it as soon as possible. </p>
            <p>Best regards,</p>
            <p>SGHEDA</p>`
        );

        // Redirect user to login or wherever you like
        res.redirect("/auth/signin");

        res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError" ||
            error.name === "NotBeforeError"
        ) {
            return res
                .status(401)
                .json({ message: "Invalid or expired reset token!" });
        }
        return res.status(500).json({ message: error.message });
    }
}
