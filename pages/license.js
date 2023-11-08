import { BillingSection } from "@components/Billing";
import { Layout } from "@components/Layout";
import { PaymentSection } from "@components/Payment";
import SEO from "@components/SEO/SEO";

export default function License() {
    return (
        <Layout className="">
            <SEO
                title="SGHEDA | License"
                description="Explore different license options at SGHEDA. From beginner-friendly tools to unlimited access for professionals, find the perfect license that matches your creative needs and aspirations."
            />
            <div className="main-wrapper relative z-10">
                <PaymentSection />
                <BillingSection />
            </div>
        </Layout>
    );
}
