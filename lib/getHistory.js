import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import History from "server/model/history.model";

export default async function getHistory(email) {
    await dbConnect();

    const account = await Account.findOne({ email });

    if (!account) {
        return null;
    }

    const _history = await History.find({ user: account._id }).sort({
        createdAt: -1
    });

    const history = [];

    for (let i = 0; i < _history.length; i++) {
        history.push({
            id: _history[i]._id.toString(),
            inputData: _history[i].inputData,
            outputData: _history[i].outputData,
            date: _history[i].createdAt.toISOString().split("T")[0],
            type: _history[i].type,
            amount: _history[i].amount
        });
    }

    return history;
}
