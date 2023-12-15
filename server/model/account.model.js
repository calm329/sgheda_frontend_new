import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        // user unique id
        email: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        verified: Boolean,
        resendCount: {
            type: Number,
            default: 0
        },

        password: String,
        balance: Number
    },
    { timestamps: true }
);

export default mongoose.models?.Account ||
    mongoose.model("Account", accountSchema);
