import argon from "argon2";
import { getServerSession } from "next-auth";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import { authOptions } from "./[...nextauth]";

export default async function handler(req, res) {
    await dbConnect();

    // Verify the session
    const session = await getServerSession(req, res, authOptions);
    console.log(session, "session");
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { currentPassword, newPassword } = req.body;

    try {
        const account = await Account.findOne({ email: session.user.email });

        if (!account) {
            return res
                .status(404)
                .json({ message: "Account not found with this email" });
        }

        const isValid = await argon.verify(account.password, currentPassword);

        if (!isValid) {
            return res
                .status(401)
                .json({ message: "Invalid current password" });
        }

        const hash = await argon.hash(newPassword);

        account.password = hash;
        await account.save();

        return res
            .status(200)
            .json({ message: "Password updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}
