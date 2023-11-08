import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";

export const IntroSection = () => {
    return (
        <SectionContainer
            className="page-banner--container p-4 pt-0 pb-0"
            id={"intro"}
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/payment.jpg')] bg-cover bg-center no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center lg:flex-row flex-col flex-col-reverse rounded-lg bg-[#09112D]/80 p-12 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="lg:w-1/2 w-full"
                    >
                        <div className="w-full">
                            <video
                                src="/intro.mp4"
                                controls
                                alt="Page Banner"
                                type="video/mp4"
                                className="m-auto rounded-xl w-full"
                            />
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="lg:w-1/2 w-full"
                    >
                        <div>
                            <div className="flex flex-col">
                                <div className="my-2 text-orange-400 text-content text-md">
                                    Intro
                                </div>
                                <div className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    What is SGHEDA?
                                </div>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                            </div>
                            <div className="text-content text-gray-300 text-lg">
                                Heat pump systems coupled to Ground Heat
                                Exchangers(GHX), so called Ground Source Heat
                                Pump(GSHP) systems are energy efficient and have
                                low environmental impact.
                                <br />
                                <br />
                                The purpose of GSHP industry is to promote a
                                sustainable and decarbonized future across the
                                globe through the adoption of geothermal as the
                                cleanest, most efficient heating and cooling
                                technology.
                                <br />
                                <br />
                                SGHEDA was created for analytical design and
                                quantifiable solutions for these systems.
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
