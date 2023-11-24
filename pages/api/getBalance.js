import argon from "argon2";
import { getServerSession } from "next-auth";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import { authOptions } from "./auth/[...nextauth]";
import corsMiddleware from "./cors";

async function handler(req, res) {
    console.log("SDFSDFSDFSDF", req.headers);
    await dbConnect();

    // Verify the session
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const account = await Account.findOne({ email: session.user.email });

        if (!account) {
            return res
                .status(404)
                .json({ message: "Account not found with this email" });
        }

        return res
            .status(200)
            .json({ success: true, balance: account.balance });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

export default corsMiddleware(handler);
