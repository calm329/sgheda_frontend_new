import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        // user unique id
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },

        // transaction type
        // type: {
        //     type: String,
        //     required: true
        // },

        // transaction amount
        amount: {
            type: Number,
            required: true
        },

        // transaction status
        status: {
            type: String,
            required: true
        },

        // transaction order id
        orderId: {
            type: String,
            required: true
        }

        // crypto currency used for the transaction
        // crypto: {
        //     type: String,
        //     required: true
        // }
    },
    { timestamps: true }
);

export default mongoose.models.Transaction ||
    mongoose.model("Transaction", transactionSchema);
