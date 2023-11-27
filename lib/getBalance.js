import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";

export default async function getBalance(email) {
    await dbConnect();

    const account = await Account.findOne({ email });

    if (!account) {
        return 0;
    }

    return account.balance;
}
