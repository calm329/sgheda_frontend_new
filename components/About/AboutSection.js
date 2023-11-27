import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import Image from "next/image";

export const AboutSection = () => {
    return (
        <SectionContainer className="page-banner--container relative m-4 mb-0">
            <div className="absolute w-full h-full bg-[#09112D]/80 left-0 top-0 rounded-lg"></div>
            <SectionContainer className="page-banner--inner-container pt-24 w-full h-full p-4 z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/about.jpg')] bg-cover no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg z-10 p-12 md:px-12 px-4">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="my-2 text-orange-400 text-content text-md">
                                    About Us
                                </div>
                                <h1 className="text-title text-3xl text-white text-center uppercase font-bold">
                                    About SGHEDA
                                </h1>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                            </div>
                            <h2 className="text-content text-gray-300 text-center text-lg">
                                SGHEDA is the ideal bridge between the latest
                                technology and the people who benefit from these
                                developments
                            </h2>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="xl:w-4/5 w-full m-auto grid md:grid-cols-2 grid-cols-1 gap-8">
                            <div className="bg-[#09112D]/60 p-8 rounded-xl">
                                <div className="flex flex-col justify-center items-start">
                                    <div className="text-title text-3xl text-white uppercase font-bold">
                                        Our mission
                                    </div>
                                    <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                                </div>
                                <div className="text-content text-gray-300 text-md">
                                    Imagine reducing energy bills, while
                                    contributing to the fight against climate
                                    change. Yes, all this is possible with our
                                    ground heat exchanger design solution, which
                                    offers environmentally-friendly and
                                    cost-effective heating and cooling systems.
                                    Whether you&apos;re a homeowner, a
                                    contractor or a large organization, our
                                    program provides a unique model to meet
                                    every specific need. It deals with an array
                                    of use cases with the utmost precision. Our
                                    modeling method uses sophisticated
                                    mathematical principles and fluid dynamics
                                    to create an optimal slinky loop
                                    configuration. It&apos;s adaptable and
                                    versatile, catering to a wide range of soil
                                    and climate conditions. We believe everyone
                                    could have access to sustainable, green
                                    solutions because making a difference to the
                                    environment should be within everyone&apos;s
                                    reach.
                                </div>
                            </div>
                            <div className="w-full lg:px-16 flex justify-center items-center">
                                <Image
                                    src="/images/about/mission.png"
                                    width={640}
                                    height={40}
                                    alt="Our mission"
                                    loading="lazy"
                                    className="bg-[#111A32] m-auto rounded-md bg-opacity-30 p-2 w-full"
                                />
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="xl:w-2/3 w-full m-auto grid md:grid-cols-2 grid-cols-1 gap-8">
                            <div className="w-full lg:px-16 flex justify-center items-center">
                                <Image
                                    src="/app.png"
                                    width={640}
                                    height={40}
                                    alt="About SGHEDA"
                                    loading="lazy"
                                    className="bg-[#111A32] m-auto rounded-md bg-opacity-30 p-2 w-full"
                                />
                            </div>
                            <div className="bg-[#09112D]/60 p-8 rounded-xl">
                                <div className="flex flex-col justify-center items-start">
                                    <div className="text-title text-3xl text-white uppercase font-bold">
                                        SGHEDA
                                    </div>
                                    <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                                </div>
                                <div className="text-content text-gray-300 text-md">
                                    Our collective embarked on designing our
                                    concept, it required a novel use of ground
                                    source heat exchangers. When traditional
                                    mathematical solutions proved elusive, we
                                    took it upon ourselves to forge a pioneering
                                    analytical tool. Our primary focus is on
                                    developing a compact, 20-foot shipping
                                    container-based solution that integrates
                                    power generation and market fungibility
                                    through server hosting. This visionary
                                    approach will yield decentralized power hubs
                                    in developing countries, and provide
                                    ethically sourced renewable powered server
                                    hosting in 2024.
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
