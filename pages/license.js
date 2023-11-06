import { BadgeMessage, BadgeGroup, BadgeIcon } from "@components/Badge";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Layout } from "@components/Layout";
import { PaymentSection } from "@components/Payment";
import { BillingSection } from "@components/Billing";
import { Columns } from "@components/Columns";
import { ContentImage } from "@components/ContentImage";
import { Content } from "@components/Content";
import { Accordion } from "@components/Accordion";
import { MotionBTTContainer } from "@components/Motion";
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
