import { Layout } from "@components/Layout";
import { ProfileSection } from "@components/Profile";
import SEO from "@components/SEO/SEO";
import getUserInfo from "lib/getUserInfo";
import { getSession } from "next-auth/react";

export default function Resource(props) {
    return (
        <Layout className="">
            <SEO title="SGHEDA | My Profile" description="" />
            <div className="main-wrapper relative z-10">
                <ProfileSection userInfo={props.userInfo} />
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false
            }
        };
    }

    const userInfo = await getUserInfo(session.user.email);

    return {
        props: {
            userInfo
        }
    };
}
