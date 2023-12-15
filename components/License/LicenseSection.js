import { Button } from "@components/Button";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export const LicenseSection = () => {
    const cardData = [
        {
            title: "Beginner",
            subtitle: "Starter-Friendly Tools",
            price: 150,
            pros: [
                "Ideal for creative newcomers",
                "Allows up to 20 designs",
                "Explore our basic tools",
                "No analysis option"
            ]
        },
        {
            title: "Pro",
            subtitle: "More Power & Insight",
            price: 250,
            pros: [
                "Perfect for regular users",
                "20 designs and 20 analyses",
                "Offers advanced tools",
                "Provides critical insights"
            ]
        },
        {
            title: "Unlimited",
            subtitle: "All Access, No Boundaries",
            price: 500,
            pros: [
                "Unrestricted access to platform",
                "Infinite designs and analyses",
                "Ideal for heavy users or teams",
                "Freedom without limits"
            ]
        }
    ];

    return (
        <SectionContainer
            id={"license"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/billing.jpg')] bg-cover bg-center no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-12 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="my-2 text-orange-400 text-content text-md">
                                    License
                                </div>
                                <div className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    Ghoose your plan
                                </div>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                                <div className="text-content text-gray-300 text-center text-lg">
                                    Our subscription plan offers exclusive
                                    access to premium content, personalized
                                    services, and regular updates. Join today to
                                    enjoy a seamless and enhanced experience
                                    tailored to your needs.
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <Swiper
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={"auto"}
                            initialSlide={1}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true
                            }}
                            pagination={false}
                            modules={[EffectCoverflow, Pagination]}
                            className="w-full flex flex-row gap-12 justify-center"
                        >
                            {cardData.map((card, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="min-w-[300px] max-w-[300px] rounded-xl flex flex-col bg-[#09112D] p-8 border-orange-400 border"
                                >
                                    <Image
                                        src="/small-logo.png"
                                        width={35}
                                        height={35}
                                        alt="design capabilities"
                                        loading="lazy"
                                        className="mb-4"
                                    />
                                    <div className="text-content text-white text-2xl font-semibold">
                                        {card.title}
                                    </div>
                                    <div className="text-content text-gray-300 text-sm">
                                        {card.subtitle}
                                    </div>
                                    <div className="mt-8">
                                        <div className="text-content text-lg text-white">
                                            $
                                        </div>
                                        <div className="text-content leading-none">
                                            <span className="text-white leading-none text-title text-[4rem] font-extrabold ml-4">
                                                {card.price}
                                            </span>
                                            <span className="text-gray-300 leading-none text-content text-sm">
                                                {" "}
                                                / month
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full h-[3px] rounded-lg bg-black-400 my-4"></div>
                                    <div className="flex flex-col gap-2 mt-4">
                                        {card.pros.map((pro, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4"
                                            >
                                                <Icon
                                                    icon="uil:check"
                                                    className="bg-orange-400 rounded-full w-5 h-5 p-1"
                                                />
                                                <span className="text-content text-sm text-white">
                                                    {pro}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        type="button"
                                        className="btn btn--secondary w-full text-white lemonsqueezy-button mt-4"
                                    >
                                        <Link
                                            href={{
                                                pathname: "/license",
                                                query: { price: card.price }
                                            }}
                                        >
                                            Purchase
                                        </Link>
                                    </Button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
