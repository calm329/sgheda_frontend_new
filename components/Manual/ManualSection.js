import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Icon } from "@iconify/react";
import Image from "next/image";

export const ManualSection = () => {
    const team = [
        {
            name: "Eric Snow",
            role: "Senior Web Developer",
            avatar: "/images/team/Eric Snow.png"
        },
        {
            name: "Eric Snow",
            role: "Senior Web Developer",
            avatar: "/images/team/Eric Snow.png"
        },
        {
            name: "Eric Snow",
            role: "Senior Web Developer",
            avatar: "/images/team/Eric Snow.png"
        },
        {
            name: "Eric Snow",
            role: "Senior Web Developer",
            avatar: "/images/team/Eric Snow.png"
        }
    ];

    return (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/manual.jpg')] bg-cover no-repeat bg-center">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-4 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full mx-auto flex flex-col gap-8">
                            <div className="w-full rounded-xl">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="my-2 text-orange-400 text-content text-md">
                                        Documentation
                                    </div>
                                    <h1 className="text-title text-3xl uppercase text-white font-bold">
                                        Get to know our software more better
                                    </h1>
                                    <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                                </div>
                                <h2 className="text-content text-gray-300 text-sm text-center">
                                    This document provides a comprehensive
                                    overview of SGHEDA, offering key insights,
                                    analysis, and essential information for your
                                    reference and understanding.
                                </h2>
                            </div>
                        </div>
                        <ButtonGroup alignment="center" className="mt-12">
                            <Button
                                type="link"
                                href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=manual`}
                                className="btn btn--secondary w-1/3 md:w-1/2 lg:w-1/4 text-white lemonsqueezy-button"
                            >
                                Download Manual
                            </Button>
                        </ButtonGroup>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
