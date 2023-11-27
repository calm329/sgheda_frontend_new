import { getServerSession } from "next-auth";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import History from "server/model/history.model";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    await dbConnect();

    // Verify the session
    const session = await getServerSession(req, res, authOptions);
    console.log(session, "session");
    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    switch (req.method) {
        case "POST":
            const { type, inputData, outputData, description, amount } =
                req.body;
            try {
                const account = await Account.findOne({
                    email: session.user.email
                });

                if (!account) {
                    return res.status(404).json({
                        success: false,
                        message: "Account not found!"
                    });
                }

                const history = await History.create({
                    user: account._id,
                    inputData,
                    outputData,
                    type,
                    description: description
                        ? description
                        : `This is the result of ${type} calculation.`,
                    amount
                });

                await history.save();

                res.status(200).json({ success: true, data: history });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
