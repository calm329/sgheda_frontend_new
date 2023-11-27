import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import Transaction from "server/model/transaction.model";

async function handler(req, res) {
    await dbConnect();

    if (req.method === "POST") {
        const { order_id, payment_status } = req.body;

        if (payment_status === "finished") {
            const doc = await Transaction.findOneAndUpdate(
                { orderId: order_id },
                { status: "ACCEPTED" },
                { new: true }
            );

            if (!doc) {
                return res
                    .status(404)
                    .json({ message: "Transaction not found" });
            }

            const account = await Account.updateOne(
                { email: doc.email },
                { $inc: { balance: doc.amount } }
            );

            if (!account) {
                return res.status(404).json({ message: "Account not found" });
            }
        } else if (payment_status === "failed") {
            await Transaction.updateOne(
                { orderId: order_id },
                { status: "FAILED" }
            );
        } else if (payment_status === "expired") {
            const doc = await Transaction.updateOne(
                { orderId: order_id },
                { status: "FAILED" }
            );

            if (!doc) {
                return res
                    .status(404)
                    .json({ message: "Transaction not found" });
            }
        } else if (payment_status === "partially_paid") {
            const doc = await Transaction.updateOne(
                { orderId: order_id },
                { status: "FAILED" }
            );

            if (!doc) {
                return res
                    .status(404)
                    .json({ message: "Transaction not found" });
            }
        }

        res.status(200).send("success");
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
