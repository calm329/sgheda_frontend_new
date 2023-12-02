import { Button, ButtonGroup } from "@components/Button";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import Image from "next/image";
import Link from "next/link";

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
                <SectionContainer className="w-full h-full flex justify-center flex-col rounded-lg bg-[#09112D]/30 p-12 md:px-20 lg:px-32 xl:px-48">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <PageTitle
                            className="lg:text-left text-white text-title !leading-sm text-center mx-auto flex flex-col"
                            type="heavy"
                        >
                            SGHEDA
                        </PageTitle>
                        <h2 className="text-white mx-auto text-center text-content text-2xl">
                            Slinky Ground Heat Exchanger Design & Analysis
                        </h2>
                        <div className="w-full bg-white backdrop-filter backdrop-blur-md bg-opacity-10 h-1 rounded-xl my-4"></div>
                    </MotionBTTContainer>
                    {/* Appear Third */}
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <div className="text-2xl flex flex-col lg:flex-row justify-between">
                            <div className="w-full lg:w-1/3">
                                <div className="w-full flex flex-row items-center gap-4 bg-[#526781]/40 p-2 my-2 rounded-lg">
                                    <Image
                                        src="/images/pros/commercial.svg"
                                        width={40}
                                        height={40}
                                        alt="Commercial"
                                        loading="lazy"
                                        className="bg-[#004D9833] rounded-md bg-opacity-30 p-2"
                                    />
                                    <span className="text-white text-lg">
                                        Commercial
                                    </span>
                                </div>
                                <div className="w-full flex flex-row items-center gap-4 bg-[#526781]/40 p-2 my-2 rounded-lg">
                                    <Image
                                        src="/images/pros/geothermal.svg"
                                        width={40}
                                        height={40}
                                        alt="Geothermal"
                                        loading="lazy"
                                        className="bg-[#004D9833] rounded-md bg-opacity-30 p-2"
                                    />
                                    <span className="text-white text-lg">
                                        Geothermal
                                    </span>
                                </div>
                                <div className="w-full flex flex-row items-center gap-4 bg-[#526781]/40 p-2 my-2 rounded-lg">
                                    <Image
                                        src="/images/pros/betterdesign.svg"
                                        width={40}
                                        height={40}
                                        alt="Better design"
                                        loading="lazy"
                                        className="bg-[#004D9833] rounded-md bg-opacity-30 p-2"
                                    />
                                    <span className="text-white text-lg">
                                        Better Design
                                    </span>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 lg:w-1/3 text-center ml-auto -mb-8 flex flex-col items-end justify-end">
                                <div className="text-white text-xl text-content lg:block hidden">
                                    Get Your Software Now And Make Wonders Now
                                </div>
                                <Button
                                    type="link"
                                    href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=software`}
                                    className="btn btn--secondary w-full my-2 text-white !text-lg lemonsqueezy-button"
                                >
                                    Download Now
                                </Button>
                                <Link
                                    href="/calculator"
                                    className="btn btn--secondary w-full my-2 whitespace-nowrap bg-orange-500/30 text-white !text-lg lemonsqueezy-button"
                                >
                                    <Image
                                        src="/images/calculator/calculator.svg"
                                        width={40}
                                        height={40}
                                        alt="performance analysis"
                                        loading="lazy"
                                        className="p-2 bg-[#F98222]/40 rounded-xl"
                                    />
                                    Online Calculator
                                </Link>
                            </div>
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
