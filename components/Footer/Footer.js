import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const navigation = [
    { name: "Home", to: "/", href: "/" },
    { name: "Resource", to: "resource", href: "/resource" },
    { name: "Collective", to: "collective", href: "/collective" },
    { name: "License", to: "#license", href: "/#license" },
    { name: "Contact Us", to: "#contact", href: "/#contact" }
];

export const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer id="footer" className="m-4 rounded-xl bg-[#09112D]">
            {/* Footer Links */}
            <SectionContainer className="footer--container p-12 relative">
                <div className="flex md:flex-row flex-col gap-12">
                    <Link href="/" className="md:hidden">
                        <Image
                            src="/sgheda.png"
                            alt="logo"
                            className="h-12 w-auto"
                            height="25"
                            width="100"
                            priority
                        />
                    </Link>
                    <div className="md:w-[60%] w-full flex gap-16">
                        <div className="w-[70%] flex flex-col">
                            <Link href="/" className="hidden md:flex">
                                <Image
                                    src="/sgheda.png"
                                    alt="logo"
                                    className="h-12 w-auto"
                                    height="25"
                                    width="100"
                                    priority
                                />
                            </Link>
                            <div className="md:mt-8">
                                <div className="text-title text-orange-400 uppercase text-lg">
                                    About us:
                                </div>
                                <div className="text-content text-white-500 text-sm">
                                    At SGHEDA, we are dedicated to
                                    revolutionizing slinky ground loop heat
                                    exchanger design. Our innovative software
                                    simplifies the process, empowering
                                    professionals and enthusiasts in creating
                                    efficient heating and cooling systems. With
                                    years of industry expertise, our team
                                    provides custom solutions and exceptional
                                    support. We prioritize sustainability,
                                    helping reduce energy consumption and
                                    environmental impact.
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%]">
                            <div className="text-title text-orange-400 uppercase text-lg">
                                Navigation
                            </div>
                            <div className="text-content text-white-500 mt-4 text-lg">
                                {navigation.map((item) => (
                                    <div key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="hover:text-[#FFC700]"
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[40%] w-full">
                        <div className="text-title text-orange-400 uppercase text-lg">
                            Availablity
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <div className="flex gap-4 items-center text-white">
                                <div className="min-w-[30px] max-w-[30px] h-[30px] flex justify-center items-center">
                                    <Icon
                                        icon="fluent:location-12-filled"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="text-content text-md">
                                    Cardamone Law 100 W. Main Street, Suite 120,
                                    Lansdale, PA 19446
                                </div>
                            </div>
                            <div className="flex gap-4 items-center text-white">
                                <div className="min-w-[30px] max-w-[30px] h-[30px] flex justify-center items-center">
                                    <Icon
                                        icon="ph:phone-fill"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="text-content text-md flex flex-col">
                                    <span>
                                        Always Call Cards® (215) 206-9068
                                    </span>
                                    <span className="text-white-500">
                                        (All Communications Remain Confidential)
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center text-white">
                                <div className="min-w-[30px] max-w-[30px] h-[30px] flex justify-center items-center">
                                    <Icon
                                        icon="mingcute:time-fill"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="text-content text-md">
                                    Hours: Available 24/7/365
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
            {/* Footer Credits */}
            <SectionContainer className="footer-credits relative z-10 px-12 py-4 flex justify-between bg-[#040B21] rounded-b-xl">
                <div className="text-white-500 text-sm">
                    <p className="my-0">© {year} All rights reserved</p>
                </div>
                <div className="text-white-500 flex gap-4">
                    <Link href="/">
                        <Icon icon="brandico:facebook" className="w-6 h-6" />
                    </Link>
                    <Link href="/">
                        <Icon icon="pajamas:twitter" className="w-6 h-6" />
                    </Link>
                    <Link href="/">
                        <Icon icon="mdi:instagram" className="w-6 h-6" />
                    </Link>
                    <Link href="/">
                        <Icon icon="fa:youtube" className="w-6 h-6" />
                    </Link>
                </div>
            </SectionContainer>
        </footer>
    );
};
