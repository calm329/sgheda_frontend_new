import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";

export default async function getUserInfo(email) {
    await dbConnect();

    const account = await Account.findOne({ email });

    if (!account) {
        return null;
    }

    return {
        balance: account.balance,
        verified: account.verified
    };
}
