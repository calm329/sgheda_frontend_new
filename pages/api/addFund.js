import { getServerSession } from "next-auth";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import Transaction from "server/model/transaction.model";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    await dbConnect();

    // Verify the session
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    switch (req.method) {
        case "POST":
            try {
                const account = await Account.findOne({
                    email: session.user.email
                });

                if (!account) {
                    return res
                        .status(404)
                        .json({ message: "Account not found!" });
                }

                if (!account.verified) {
                    return res
                        .status(403)
                        .json({ message: "Account not verified!" });
                }

                // handle nowpayments
                const uid = uuidv4();

                try {
                    const response = await fetch(
                        "https://api.nowpayments.io/v1/invoice",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-api-key": process.env.NOWPAYMENTS_API_KEY
                            },
                            body: JSON.stringify({
                                price_amount: req.body.fundAmount,
                                price_currency: "usd",
                                order_id: uid,
                                order_description: "Add fund for SGHEDA",
                                ipn_callback_url:
                                    "https://slinkyghxdesign.com/api/ipn/addFund"
                            }),
                            redirect: "follow"
                        }
                    );
                    const data = await response.json();

                    const { invoice_url } = data;
                    console.log(invoice_url, "invoice_url");

                    const transaction = new Transaction({
                        user: account._id,
                        amount: req.body.fundAmount,
                        status: "PENDING",
                        orderId: uid
                    });
                    const newTransaction = await transaction.save();

                    res.status(200).json({ success: true, invoice_url });
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        error: error.message
                    });
                }
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
