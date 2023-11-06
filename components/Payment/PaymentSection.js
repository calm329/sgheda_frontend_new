import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Icon } from "@iconify/react";
import Image from "next/image";

export const PaymentSection = () => {
    return (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/payment.jpg')] bg-center bg-cover no-repeat">
                <SectionContainer className="w-full h-full p-4 pt-24 flex gap-12 justify-center flex-col rounded-lg">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full mx-auto bg-[#1C2743]/40 rounded-xl p-8 flex flex-col gap-8">
                            <div className="w-full rounded-xl">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="text-title text-3xl uppercase text-white font-bold">
                                        Payment method
                                    </div>
                                    <div className="h-1 w-full mb-2 bg-white/20 my-4"></div>
                                </div>
                                <div className="text-content text-gray-300 text-sm my-4 text-center">
                                    Our subscription plan offers exclusive
                                    access to premium content, personalized
                                    services, and regular updates. Join today to
                                    enjoy a seamless and enhanced experience
                                    tailored to your needs.
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
