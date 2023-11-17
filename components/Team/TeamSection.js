import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import Image from "next/image";

export const TeamSection = () => {
    const team = [
        {
            name: "Peter Chen",
            role: "Project Manager",
            avatar: "/images/team/Peter Chen.png"
        },
        {
            name: "Vladyslav Moroz",
            role: "Full Stack Developer",
            avatar: "/images/team/Vladyslav Moroz.png"
        },
        {
            name: "Joaquin Mendez",
            role: "Mechanical Engineer",
            avatar: "/images/team/Joaquin Mendez.png"
        }
    ];
    return (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/team.jpg')] bg-cover no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-4 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full mx-auto flex flex-col gap-8">
                            <div className="w-full rounded-xl">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="my-2 text-orange-400 text-content text-md">
                                        Our Team
                                    </div>
                                    <div className="text-title text-3xl text-white font-bold">
                                        Meet Geniuses Behind Your Success.
                                    </div>
                                    {/* <div className="h-1 w-16 mb-2 bg-orange-400"></div> */}
                                </div>
                                <div className="text-content text-gray-300 text-sm">
                                    At SGHEDA, we&apos;re powered by a
                                    passionate team of geothermal experts and
                                    software enthusiasts. Our dedicated
                                    professionals combine their geoscience
                                    knowledge with cutting-edge 3D technology to
                                    develop innovative solutions that drive the
                                    future of geothermal services. Get to know
                                    the faces behind the software that&apos;s
                                    shaping the geothermal industry.
                                </div>
                            </div>
                            <div
                                className={`grid xl:grid-cols-${Math.min(
                                    team.length,
                                    4
                                )} lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-4`}
                            >
                                {team.map((item, index) => (
                                    <div
                                        key={index}
                                        className="h-fit rounded-3xl relative mx-auto"
                                    >
                                        <Image
                                            src={item.avatar}
                                            width={640}
                                            height={40}
                                            alt={item.name}
                                            loading="lazy"
                                            className="rounded-3xl w-full max-w-[300px]"
                                        />
                                        <div className="absolute w-full bg-white/20 flex flex-col bottom-0 left-0 p-4 rounded-br-3xl rounded-bl-3xl rounded-3xl text-center">
                                            <span className="text-3xl text-white text-title font-extrabold">
                                                {item.name}
                                            </span>
                                            <span className="h-[2px] mb-2 bg-orange-400"></span>
                                            <span className="text-sm text-white text-content">
                                                {item.role}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
