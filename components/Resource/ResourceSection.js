import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";

export const ResourceSection = () => {
    return (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/resource.png')] bg-center bg-cover no-repeat">
                <SectionContainer className="w-full h-full p-4 pt-24 flex gap-12 justify-center flex-col rounded-lg">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full mx-auto bg-[#1C2743]/40 rounded-xl p-8 flex flex-col gap-8">
                            <div className="w-full rounded-xl">
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className="text-title text-3xl uppercase text-white font-bold">
                                        Resource
                                    </h1>
                                    <div className="h-1 w-full mb-2 bg-white/20 my-4"></div>
                                </div>
                                <h2 className="text-content text-gray-300 text-sm my-4 text-center">
                                    Explore our Resources Page for valuable
                                    insights, tools, and information to enhance
                                    your geothermal expertise. Access industry
                                    reports, software resources, and more to
                                    support your geothermal projects.
                                </h2>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
