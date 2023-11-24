import jwt from "jsonwebtoken";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";

export default async function (req, res) {
    try {
        // connect database
        await dbConnect();

        // check request method POST or not
        if (req.method !== "GET")
            throw Error("HTTP method not valid only POST Accepted!");

        const { token } = req.query;

        try {
            const { accountId } = jwt.verify(
                token,
                process.env.NEXTAUTH_SECRET
            );

            const account = await Account.findById(accountId);
            if (!account) throw new Error("Account not found");

            account.verified = true;
            await account.save();

            // Redirect user to login or wherever you like
            res.redirect("/auth/signin");
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
