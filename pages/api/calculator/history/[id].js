import { getServerSession } from "next-auth";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import History from "server/model/history.model";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
    await dbConnect();

    const {
        query: { id }
    } = req;

    if (!id) {
        res.status(400).json({ error: "Missing id" });
        return;
    }

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

            const history = await History.findOne({
                _id: id,
                user: account._id
            });

            if (!history) {
                return res.status(404).json({
                    message: "You don't have permission to access this history"
                });
            }

            const data = `{ "inputData": ${history.inputData}, "outputData": ${history.outputData} }`;

            console.log(data);

            // set Header
            res.setHeader(
                "Content-disposition",
                `attachment; filename=${history._id.toString()}.${
                    history.type
                }.gld`
            );
            res.setHeader("Content-type", "application/json");

            res.status(200).send(data);
            break;
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
