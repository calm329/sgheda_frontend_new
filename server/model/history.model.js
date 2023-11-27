import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
    {
        // user unique id
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },

        type: {
            type: String,
            required: true
        },

        inputData: {
            type: String,
            required: true
        },

        outputData: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.models.History ||
    mongoose.model("History", historySchema);
