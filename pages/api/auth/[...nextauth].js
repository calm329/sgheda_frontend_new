import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import bcrypt from "bcryptjs";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            async profile(profile) {
                await dbConnect();

                const email = profile.email;
                const name = profile.name;

                const userImage = profile.picture;

                const exist_account = await Account.findOne({ email });
                if (!exist_account)
                    await Account.create({ email, name, balance: 0 });

                return {
                    id: profile.sub,
                    name,
                    email,
                    verified: exist_account ? exist_account.verified : false,
                    image: userImage,
                    balance: exist_account ? exist_account.balance : 0
                };
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                await dbConnect();

                const account = await Account.findOne({
                    email: credentials.email
                });

                if (!account) throw Error("Email or Password doesn't match!");

                if (!account.password) {
                    throw Error("Please sign in with Google");
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    account.password
                );

                if (!isValid) throw Error("Email or Password doesn't match!");

                return {
                    id: account._id,
                    name: account.name,
                    email: account.email,
                    verified: account.verified,
                    balance: account.balance
                };
            }
        })
    ],

    // JWT
    callbacks: {
        jwt: async ({ token, user, trigger, session }) => {
            if (trigger == "update" && typeof session?.balance == "number") {
                token.balance = session?.balance;
            }
            if (
                trigger == "update" &&
                session?.balance == "refetch" &&
                user?.email
            ) {
                const account = await Account.findOne({
                    email: user.email
                });
                token.balance = account?.balance ?? token.balance;
            }

            if (user) {
                token.userId = user.id;
                token.verified = user.verified;
                token.balance = user.balance;
            }
            return token;
        },
        session: async ({ session, token, user, trigger, newSession }) => {
            if (token) {
                session.userId = token.userId;
                session.verified = token.verified;
                session.balance = token.balance;
            }
            return session;
        }
    },

    session: {
        jwt: true,
        secure: process.env.NODE_ENV && process.env.NODE_ENV === "production"
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET
    },

    site: process.env.NEXTAUTH_URL,
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET
});
