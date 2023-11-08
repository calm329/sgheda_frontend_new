import { Layout } from "@components/Layout";
import { HomeBanner } from "@components/Banner";
import { IntroSection } from "@components/Intro";
import { HowItWorksSection } from "@components/HowItWorks";
import { FeatureSection } from "@components/Feature";
import { SimAndVerifySection } from "@components/SimAndVerify";
import { LicenseSection } from "@components/License";
import { ContactSection } from "@components/Contact";
import { TestimonialSection } from "@components/Testimonial";
import SEO from "@components/SEO/SEO";

export default function Home() {
    return (
        <Layout className="">
            <SEO
                title="SGHEDA | Slinky Ground Heat Exchanger Design & Analysis"
                description=""
            />
            <div className="main-wrapper relative z-10">
                <HomeBanner />
                <IntroSection />
                <HowItWorksSection />
                <FeatureSection />
                <SimAndVerifySection />
                <LicenseSection />
                <ContactSection />
                <TestimonialSection />
            </div>
        </Layout>
    );
}
