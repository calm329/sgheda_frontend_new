import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Icon } from "@iconify/react";
import Image from "next/image";
import ImageGallery from "react-image-gallery";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const SimAndVerifySection = () => {
    const images = [
        {
            original: "/images/simulation/1.png"
        },
        {
            original: "/images/simulation/2.png"
        },
        {
            original: "/images/simulation/3.png"
        },
        {
            original: "/images/simulation/4.png"
        },
        {
            original: "/images/simulation/5.png"
        },
        {
            original: "/images/simulation/6.png"
        },
        {
            original: "/images/simulation/7.png"
        },
        {
            original: "/images/simulation/8.png"
        },
        {
            original: "/images/simulation/9.png"
        }
    ];

    return (
        <SectionContainer
            id={"simulation"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/simulation.jpg')] bg-cover bg-center no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-12 md:px-12 px-4">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                {/* <div className="my-2 text-orange-400 text-content text-md">
                                    Features
                                </div> */}
                                <div className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    Simulation and verification
                                </div>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                                <div className="text-content text-gray-300 text-center text-lg">
                                    The slinky GHE configuration refers to the
                                    arrangement of the pipes in a tightly coiled
                                    or helical shape resembling a slinky toy.
                                    <br />
                                    This configuration maximizes the surface
                                    area of the pipes in contact with the
                                    ground, enhancing the heat transfer
                                    efficiency
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-12">
                            <div className="rounded-lg bg-[#1C2743] lg:w-2/3 m-auto md:w-full sm:w-2/3 w-full p-8 text-white text-md text-content">
                                We especially paid attention to this step
                                because we know it is really what our customers
                                interested in.
                                <br /> Trust in the accuracy and reliability of
                                our design as we leverage the industry-leading
                                computational fluid dynamics (CFD) software to
                                simulate heat transfer, fluid flow dynamics, and
                                thermal behavior in your GHE system.
                            </div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                loop={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    clickable: true
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="rounded-lg w-[90%] lg:w-[65%] xl:w-[50%] lg:2/3 md:w-full sm:w-2/3 w-full m-auto !overflow-hidden"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <Image
                                            key={index}
                                            src={image.original}
                                            width={640}
                                            height={40}
                                            alt={`Image ${index}`}
                                            objectFit="cover"
                                            loading="lazy"
                                            className="w-full"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
