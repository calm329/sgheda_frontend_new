import { SGHEDACalculatorSection } from "@components/Calculator";
import { Layout } from "@components/Layout";
import SEO from "@components/SEO/SEO";
import { SGHEDA } from "@components/Calculator/SGHEDA";
import { getSession } from "next-auth/react";

export default function Resource(props) {
    return (
        <Layout className="">
            <SEO title="SGHEDA | Online Calculator" description="" />
            <div className="main-wrapper relative z-10">
                <SGHEDACalculatorSection />
                <SGHEDA />
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
