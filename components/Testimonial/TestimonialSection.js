import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export const TestimonialSection = () => {
    const testimonials = [
        {
            name: "Ron Herrera",
            role: "INTERNATIONAL V.P - WEST",
            content:
                '"Our Union can now message members instantly for meetings, political endorsements"'
        },
        {
            name: "Ron Herrera",
            role: "INTERNATIONAL V.P - WEST",
            content:
                '"Our Union can now message members instantly for meetings, political endorsements"'
        },
        {
            name: "Ron Herrera",
            role: "INTERNATIONAL V.P - WEST",
            content:
                '"Our Union can now message members instantly for meetings, political endorsements"'
        },
        {
            name: "Ron Herrera",
            role: "INTERNATIONAL V.P - WEST",
            content:
                '"Our Union can now message members instantly for meetings, political endorsements"'
        },
        {
            name: "Ron Herrera",
            role: "INTERNATIONAL V.P - WEST",
            content:
                '"Our Union can now message members instantly for meetings, political endorsements"'
        }
    ];
    return (
        <SectionContainer
            id={"testimonials"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/testimonial.png')] bg-contain bg-center bg-center bg-no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-12 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="my-2 text-orange-400 text-content text-md">
                                    Testimonials
                                </div>
                                <div className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    What our clients say about us?
                                </div>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        {/* <div className="flex flex-row justify-center gap-4"> */}
                        <Swiper
                            slidesPerView={"auto"}
                            centeredSlides={true}
                            spaceBetween={60}
                            pagination={{
                                clickable: true
                            }}
                            initialSlide={Math.floor(testimonials.length / 2)}
                            modules={[Pagination]}
                            className="scale-swiper"
                        >
                            {testimonials.map((t, i) => (
                                <SwiperSlide
                                    key={i}
                                    className="relative !h-auto min-w-[350px] max-w-[350px] rounded-xl bg-white p-8 border-orange-400 border"
                                >
                                    <div className="absolute -top-6 right-6 flex justify-center items-center bg-orange-400 text-white text-[3rem] w-12 h-12 rounded-sm font-extrabold">
                                        <Image
                                            src="/quota.png"
                                            width={20}
                                            height={20}
                                            alt="quota"
                                            loading="lazy"
                                            className=""
                                        />
                                    </div>
                                    <div className="flex gap-4 items-center mb-4">
                                        <Image
                                            src="/avatar.png"
                                            width={60}
                                            height={60}
                                            alt="design capabilities"
                                            loading="lazy"
                                            className=""
                                        />
                                        <div className="flex flex-col justify-center">
                                            <span className="text-title text-md font-bold text-black">
                                                {t.name}
                                            </span>
                                            <span className="text-content text-sm font-semibold text-blue-600">
                                                {t.role}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {t.content}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* </div> */}
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
