import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Icon } from "@iconify/react";
import Image from "next/image";

export const HomeBanner = () => {
    return (
        <SectionContainer className="page-banner--container h-screen relative p-4">
            <SectionContainer
                className="page-banner--inner-container relative w-full h-full pt-24 px-4 pb-4 z-10 flex bg-black/20 bg-center bg-no-repeat lg:flex-row flex-col rounded-lg gap-4"
                style={{
                    background:
                        'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.30) 100%), linear-gradient(0deg, rgba(9, 17, 45, 0.90) -0.26%, rgba(9, 17, 45, 0.00) 99.28%), url("/images/background/home.jpg")',
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    backgroundPosition: "center 30%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
            >
                <SectionContainer className="w-full h-full flex justify-center flex-col rounded-lg bg-[#09112D]/30 p-12 md:px-20 lg:px-40 xl:px-64">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <PageTitle
                            className="lg:text-left text-white text-title !leading-sm text-center mx-auto flex flex-col"
                            type="heavy"
                        >
                            SGHEDA
                        </PageTitle>
                        <div className="text-white mx-auto text-center text-content text-2xl">
                            Slinky Ground Heat Exchanger Design & Analysis
                        </div>
                        <div className="w-full bg-white backdrop-filter backdrop-blur-md bg-opacity-10 h-1 rounded-xl my-4"></div>
                    </MotionBTTContainer>
                    {/* Appear Third */}
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <div className="text-2xl flex flex-col justify-center">
                            <div className="lg:w-1/3 md:w-1/2 w-full flex flex-row items-center gap-4 bg-[#526781]/40 p-2 my-2 rounded-lg">
                                <Image
                                    src="/images/pros/commercial.svg"
                                    width={40}
                                    height={40}
                                    alt="Commercial"
                                    objectFit="cover"
                                    loading="lazy"
                                    className="bg-[#004D9833] rounded-md bg-opacity-30 p-2"
                                />
                                <span className="text-white">Commercial</span>
                            </div>
                            <div className="lg:w-1/3 md:w-1/2 w-full flex flex-row items-center gap-4 bg-[#526781]/40 p-2 my-2 rounded-lg">
                                <Image
                                    src="/images/pros/geothermal.svg"
                                    width={40}
                                    height={40}
                                    alt="Commercial"
                                    objectFit="cover"
                                    loading="lazy"
                                    className="bg-[#004D9833] rounded-md bg-opacity-30 p-2"
                                />
                                <span className="text-white">Geothermal</span>
                            </div>
                            <div className="lg:w-1/3 md:w-1/2 w-full flex flex-row items-center gap-4 bg-[#526781]/40 p-2 my-2 rounded-lg">
                                <Image
                                    src="/images/pros/betterdesign.svg"
                                    width={40}
                                    height={40}
                                    alt="Commercial"
                                    objectFit="cover"
                                    loading="lazy"
                                    className="bg-[#004D9833] rounded-md bg-opacity-30 p-2"
                                />
                                <span className="text-white">
                                    Better Design
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 mb-16 text-center">
                            <ButtonGroup alignment="right">
                                <Button
                                    type="link"
                                    href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=software`}
                                    className="btn btn--secondary w-1/3 lg:w-1/4 text-white lemonsqueezy-button"
                                >
                                    Download Now
                                </Button>
                            </ButtonGroup>
                        </div>
                    </MotionBTTContainer>
                    {/* </div> */}
                </SectionContainer>
                {/* <SectionContainer className="lg:w-2/3 w-full rounded-xl bg-white backdrop-filter backdrop-blur-md bg-opacity-10 flex justify-center items-center"> */}
                {/* Appear Fourth */}
                {/* <MotionBTTContainer transition={{ delay: 0.8, duration: 0.5 }}>
                        <div className="page-banner--image">
                            <video
                                src="/intro.mp4"
                                controls
                                autoPlay
                                alt="Page Banner"
                                type="video/mp4"
                                className="m-auto rounded-xl w-4/5"
                            />
                        </div>
                    </MotionBTTContainer> */}
                {/* </SectionContainer> */}
            </SectionContainer>
        </SectionContainer>
    );
};
