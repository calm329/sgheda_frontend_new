import { Layout } from "@components/Layout";
import { ResourceSection } from "@components/Resource";
import { DownloadSection } from "@components/Download";
import { ManualSection } from "@components/Manual";
import SEO from "@components/SEO/SEO";

export default function Resource() {
    return (
        <Layout className="">
            <SEO
                title="SGHEDA | Resource"
                description="Discover a wealth of resources on SGHEDA. From how-to tutorials, to insightful articles, find everything you need to help you navigate and utilize our platform's features to the fullest."
            />
            <div className="main-wrapper relative z-10">
                <ResourceSection />
                <DownloadSection />
                <ManualSection />
            </div>
        </Layout>
    );
}
