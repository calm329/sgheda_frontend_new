import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "server/dbConnect";
import Account from "server/model/account.model";
import argon from "argon2";

export default NextAuth({
    providers: [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

            async profile(profile) {
                dbConnect();

                const email = profile.email;
                const name = profile.name;

                // profile object will have data like email, name, and photo url
                const userImage = profile.picture;

                console.log(email, name);

                const exist_account = await Account.findOne({ email });
                if (!exist_account)
                    await Account.create({ email, name, balance: 0 });

                return {
                    id: profile.sub,
                    name,
                    email,
                    image: userImage
                };
            }
        }),

        // With CustomCredentials
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                await dbConnect();

                // check user existence
                const account = await Account.findOne({
                    email: credentials?.email
                });

                // Check if the account exists
                if (!account) throw Error("Email or Password doesn't match!");

                // If the user doesn't have a password (meaning they registered with Google)
                // throw an error directing them to login with Google instead
                if (!account.password) {
                    throw Error("Please sign in with Google");
                }

                // If the user has a password, check if it matches
                const matchedPassword = await argon.verify(
                    account.password,
                    credentials.password
                );

                if (!matchedPassword || account.email !== credentials.email)
                    throw Error("Email or Password doesn't match!");

                return account;
            }
        })
    ],

    secret: "NE6qyym4mH0hNJP7nAq+kNS6OGo0RUfXPkCWyYl46cA="
});
