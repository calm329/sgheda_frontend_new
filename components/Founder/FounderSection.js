import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import Image from "next/image";

export const FounderSection = () => {
    const founder = {
        name: "Eric Snow",
        avatar: "/images/team/Eric Snow.png",
        bio: "Eric brings over 35 years of extensive experience in diverse fields focused on demanding environments. His career has spanned across sectors as varied as nuclear submarines, high-tech manufacturing, and healthcare, making him a seasoned engineer and electrician. Responsibilities included design, construction, operations, and maintenance."
    };
    return (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/team.jpg')] bg-cover no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-12 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full mx-auto flex flex-col md:flex-row gap-8">
                            <div className="xl:w-1/3 md:w-1/2 rounded-xl">
                                <div className="flex flex-col justify-center items-start">
                                    <div className="my-2 text-orange-400 text-content text-md">
                                        Our Founder
                                    </div>
                                    <div className="text-title text-3xl text-white font-bold">
                                        Meet Geniuses Behind Your Success.
                                    </div>
                                    {/* <div className="h-1 w-16 mb-2 bg-orange-400"></div> */}
                                </div>
                                <div className="text-content text-gray-300 text-sm">
                                    {founder.bio}
                                </div>
                            </div>
                            <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 m-auto h-fit rounded-3xl relative max-w-[350px]">
                                <div className="absolute flex flex-col top-0 right-0 p-4 bg-[#F98222]/30 rounded-tr-3xl rounded-bl-3xl text-center border border-[#F98222] border-r-0 border-t-0">
                                    <span className="text-3xl text-white text-title font-extrabold">
                                        CEO
                                    </span>
                                    <span className="text-sm text-white text-content">
                                        Chief Exectuive Officer
                                    </span>
                                </div>
                                <Image
                                    src={founder.avatar}
                                    width={640}
                                    height={40}
                                    alt="Commercial"
                                    objectFit="cover"
                                    loading="lazy"
                                    className="rounded-3xl w-full"
                                />
                                <div className="absolute flex flex-col bg-white/20 bottom-0 left-0 p-4 rounded-tr-3xl rounded-bl-3xl text-center">
                                    <span className="text-3xl text-white text-title font-extrabold">
                                        {founder.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
