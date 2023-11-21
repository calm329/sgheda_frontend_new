import { Layout } from "@components/Layout";
import { ProfileSection } from "@components/Profile";
import SEO from "@components/SEO/SEO";

export default function Resource() {
    return (
        <Layout className="">
            <SEO title="SGHEDA | My Profile" description="" />
            <div className="main-wrapper relative z-10">
                <ProfileSection />
                {/* <AccountCreditSection /> */}
            </div>
        </Layout>
    );
}
