import { RLCCalculatorSection } from "@components/Calculator";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import { RLC } from "@components/Calculator/RLC";
import { getSession } from "next-auth/react";

export default function Resource(props) {
    return (
        <Layout className="">
            <SEO title="RLC | Online Calculator" description="" />
            <div className="main-wrapper relative z-10">
                <RLCCalculatorSection />
                <RLC />
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

    return {
        props: {}
    };
}
