import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Icon } from "@iconify/react";
import Image from "next/image";

export const FeatureSection = () => {
    return (
        <SectionContainer
            id={"feature"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/feature.jpg')] bg-cover bg-center no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-12 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="my-2 text-orange-400 text-content text-md">
                                    Features
                                </div>
                                <h1 className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    Features that makes your design easily
                                </h1>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 grid-flow-row gap-12">
                            <div className="rounded-lg flex flex-col bg-white/10 p-8 gap-4">
                                <Image
                                    src="/images/features/design.png"
                                    width={50}
                                    height={50}
                                    alt="design capabilities"
                                    objectFit="cover"
                                    loading="lazy"
                                    className=""
                                />
                                <div className="text-content text-white text-2xl">
                                    Design Capabilities
                                </div>
                                <div className="text-content text-gray-300 text-lg">
                                    Our program offers a wide range of design
                                    capabilities, allowing you to create GHE
                                    system tailored to your specific needs and
                                    requirements
                                </div>
                            </div>
                            <div className="rounded-lg flex flex-col bg-white/10 p-8 gap-4">
                                <Image
                                    src="/images/features/performance.png"
                                    width={50}
                                    height={50}
                                    alt="design capabilities"
                                    objectFit="cover"
                                    loading="lazy"
                                    className=""
                                />
                                <div className="text-content text-white text-2xl">
                                    Performance Analysis
                                </div>
                                <div className="text-content text-gray-300 text-lg">
                                    Our program offers you the capability to
                                    analyze accurately the performance of your
                                    ground heat exchanger system. It enables
                                    consideration of numerous real-world factors
                                    in the design and analysis process,
                                    providing a comprehensive and realistic
                                    evaluation.
                                </div>
                            </div>
                            <div className="rounded-lg flex flex-col bg-white/10 p-8 gap-4">
                                <Image
                                    src="/images/features/interface.png"
                                    width={50}
                                    height={50}
                                    alt="design capabilities"
                                    objectFit="cover"
                                    loading="lazy"
                                    className=""
                                />
                                <div className="text-content text-white text-2xl">
                                    User-Friendly Interface
                                </div>
                                <div className="text-content text-gray-300 text-lg">
                                    Our program features a user-friendly
                                    interface that makes it easy to navigate and
                                    utilize its powerful design and analysis
                                    capabilities.
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
