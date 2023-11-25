import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import Link from "next/link";
import Image from "next/image";

const links = [
    {
        name: "Room Load Calculator",
        description:
            "Optimize your Roam experience with our Roam Load Calculator. Streamline your load management effortlessly, ensuring efficient usage tailored to your needs.",
        link: "/calculator/rlc"
    },
    {
        name: "SGHEDA",
        description:
            "Enhance geothermal efficiency with our Slinky Ground Heat Exchanger tool, optimizing heat exchange through innovative coil designs for sustainable heating and cooling.",
        link: "/calculator/sgheda"
    },
    {
        name: "EAHED",
        description:
            "Enhance geothermal efficiency with our Slinky Ground Heat Exchanger tool, optimizing heat exchange through innovative coil designs for sustainable heating and cooling.",
        link: "/calculator/eahed"
    },
    {
        name: "Interior Finish Selection",
        description:
            "Simplify your design journey with our Interior Finish Selection service. Explore curated options to effortlessly elevate your space, ensuring a harmonious blend of style and functionality.",
        link: "/calculator/ifs"
    }
];

export const CalculatorBodySection = () => {
    return (
        <SectionContainer
            id={"sgheda"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/calculator.jpg')] bg-center bg-cover no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 bg-[#09112D]/80 justify-center flex-col rounded-lg p-12 md:px-12 px-4">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="my-2 text-orange-400 text-content text-md">
                                    Calculator
                                </div>
                                <div className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    What do you want to calculate?
                                </div>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                                <div className="text-content text-gray-300 text-center text-lg">
                                    Our design tool is your gateway to
                                    creativity and innovation. Whether you're a
                                    seasoned professional or a beginner, our
                                    intuitive platform simplifies the design
                                    process, making it accessible to all. Here's
                                    how it works:
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 grid-flow-row gap-12">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.link}
                                    className="rounded-lg flex flex-col bg-white/10 p-8 gap-4 select-none cursor-pointer transition-all hover:bg-[#F98222]/40 hover:scale-105"
                                >
                                    <Image
                                        src="/images/calculator/calculator.svg"
                                        width={40}
                                        height={40}
                                        alt="performance analysis"
                                        loading="lazy"
                                        className="p-2 bg-[#F98222]/40 rounded-xl"
                                    />
                                    <div className="text-content text-white text-lg font-bold">
                                        {link.name}
                                    </div>
                                    <div className="text-content text-gray-300 text-md">
                                        {link.description}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    HISTORY
                                </div>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
