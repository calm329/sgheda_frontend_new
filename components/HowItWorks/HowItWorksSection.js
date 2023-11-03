import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Icon } from "@iconify/react";
import Image from "next/image";

export const HowItWorksSection = () => {
    return (
        <SectionContainer
            id={"tutorial"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/payment.jpg')] bg-cover bg-center no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-12 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="my-2 text-orange-400 text-content text-md">
                                    Tutorial
                                </div>
                                <div className="text-title text-3xl text-white text-center uppercase font-bold">
                                    How It Works?
                                </div>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                            </div>
                            <div className="text-content text-gray-300 text-center text-lg xl:px-16">
                                Our design tool is your gateway to creativity
                                and innovation. Whether you&apos;re a seasoned
                                professional or a beginner, our intuitive
                                platform simplifies the design process, making
                                it accessible to all. Here&apos;s how it works:
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <video
                                src="/video.mp4"
                                controls
                                alt="Page Banner"
                                type="video/mp4"
                                className="m-auto rounded-xl md:w-2/3 w-full"
                            />
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
