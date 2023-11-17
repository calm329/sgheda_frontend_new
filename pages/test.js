import { signIn, signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function Test() {
    const { session, loading } = useSession();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!session) {
        return (
            <div>
                <button onClick={() => signIn("email")}>
                    Sign in with Email
                </button>
                <button onClick={() => signIn("google")}>
                    Sign in with Google
                </button>
            </div>
        );
    }

    return (
        <div>
            <p>Welcome, {session.user.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    return {
        props: { session }
    };
};
