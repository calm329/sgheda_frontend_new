import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Icon } from "@iconify/react";

export const ProfileSection = () => {
    const { data: session, status } = useSession();
    console.log(session);
    const loading = status === "loading";

    return !loading && session ? (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/resource.png')] bg-center bg-cover no-repeat">
                <SectionContainer className="w-full h-full p-4 pt-24 flex gap-12 justify-center flex-col rounded-lg">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full grid grid-cols-2 gap-4">
                            <div className="w-full mx-auto bg-[#1C2743]/40 rounded-xl p-8 flex gap-8">
                                <div className="">
                                    {session.user.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt="User avatar"
                                            className="rounded-full"
                                            width={80} // specify a size (replace these with the desired dimensions)
                                            height={80} // specify a size
                                        />
                                    ) : (
                                        <Icon
                                            icon="mingcute:user-4-fill"
                                            className="w-[80px] h-[80px] text-white"
                                        />
                                    )}
                                </div>
                                <div className="text-content">
                                    <div className="text-white font-semibold text-3xl">
                                        {session.user.name}
                                    </div>
                                    <div className="text-gray-300 font-semibold text-2xl whitespace-nowrap text-ellipsis overflow-hidden max-w-fit">
                                        {session.user.email}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mx-auto bg-[#1C2743]/40 rounded-xl p-8 flex flex-col gap-8">
                                <div className="w-full rounded-xl">
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className="text-title text-3xl uppercase text-white font-bold">
                                            Resource
                                        </h1>
                                        <div className="h-1 w-full mb-2 bg-white/20 my-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    ) : (
        <></>
    );
};
