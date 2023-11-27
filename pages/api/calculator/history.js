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
        case "GET":
            const account = await Account.findOne({
                email: session.user.email
            });

            if (!account) {
                return res.status(404).json({ message: "Account not found" });
            }

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 6;

            const skip = (page - 1) * (limit - 1);

            try {
                const _history = await History.find({
                    user: account._id
                })
                    .sort({ createdAt: -1 }) // sort by date in descending order
                    .skip(skip)
                    .limit(limit)
                    .exec();

                const historyData = [];

                for (let i = 0; i < _history.length; i++) {
                    historyData.push({
                        id: _history[i]._id.toString(),
                        inputData: _history[i].inputData,
                        outputData: _history[i].outputData,
                        date: _history[i].createdAt.toISOString().split("T")[0],
                        type: _history[i].type,
                        amount: _history[i].amount
                    });
                }

                res.status(200).json(historyData);
            } catch (err) {
                res.status(500).json({ message: "Error occurred", error: err });
            }
            break;
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
