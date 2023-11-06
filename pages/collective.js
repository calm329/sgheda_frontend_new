import { Layout } from "@components/Layout";
import { AboutSection } from "@components/About";
import { FounderSection } from "@components/Founder";
import { TeamSection } from "@components/Team";
import SEO from "@components/SEO/SEO";

export default function Collective() {
    return (
        <Layout className="">
            <SEO
                title="SGHEDA | Collective"
                description="Join the SGHEDA Collective, a community of passionate creatives. Collaborate, engage, and learn from industry professionals and peers in our active and vibrant network"
            />
            <div className="main-wrapper relative z-10">
                <AboutSection />
                <FounderSection />
                <TeamSection />
            </div>
        </Layout>
    );
}
