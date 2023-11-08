import { HomeBanner } from "@components/Banner";
import { ContactSection } from "@components/Contact";
import { FeatureSection } from "@components/Feature";
import { HowItWorksSection } from "@components/HowItWorks";
import { IntroSection } from "@components/Intro";
import { Layout } from "@components/Layout";
import { LicenseSection } from "@components/License";
import SEO from "@components/SEO/SEO";
import { SimAndVerifySection } from "@components/SimAndVerify";
import { TestimonialSection } from "@components/Testimonial";
import { useEffect } from "react";

export default function Home() {

    useEffect(() => {
        const sendData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/visitor`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({}), // Replace with the request body if needed
                    }
                );
                const data = await response.json();

                console.log(data, "I am here", divRef.current)
            } catch (error) {
                console.error(error);
            }
        };

        if (typeof window !== "undefined") {
            // This will only run in the browser where window is defined
            sendData();
        }
    }, []);

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
