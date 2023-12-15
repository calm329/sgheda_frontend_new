import { EAHEDCalculatorSection } from "@components/Calculator";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import { EAHED } from "@components/Calculator/EAHED";
import { getSession } from "next-auth/react";

export default function Resource(props) {
    return (
        <Layout className="">
            <SEO title="EAHED | Online Calculator" description="" />
            <div className="main-wrapper relative z-10">
                <EAHEDCalculatorSection />
                <EAHED />
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
