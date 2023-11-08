import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionContainer } from "@components/Section";
import { Nav } from "@components/Nav";

export const Header = () => {
    const [isScrollTop, setIsScrollTop] = useState(true);

    const listenScrollEvent = () => {
        if (window.scrollY > 10) {
            return setIsScrollTop(false);
        } else {
            return setIsScrollTop(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    return (
        <header
            id="header"
            className={`header fixed left-0 w-full transition duration-500 ease-in-out z-30 ${
                isScrollTop ? "p-4" : ""
            }`}
        >
            <SectionContainer
                className={`${
                    isScrollTop ? "p-4" : ""
                } transition duration-500 ease-in-out rounded-xl`}
            >
                <SectionContainer
                    className={`header--container w-full blur-none transition duration-500 ease-in-out ${
                        isScrollTop
                            ? "bg-[#1C2743]/40 rounded-xl"
                            : "bg-[#1C2743]"
                    } px-12`}
                >
                    <div className="header-logo--container">
                        <h1 className="logo mb-0">
                            <Link href="/">
                                <Image
                                    src="/sgheda.png"
                                    alt="sgheda logo"
                                    className="h-12 w-auto"
                                    height="32"
                                    width="200"
                                    priority
                                />
                            </Link>
                        </h1>
                    </div>
                    <SectionContainer className="flex items-center ml-auto">
                        <Nav />
                    </SectionContainer>
                </SectionContainer>
            </SectionContainer>
        </header>
    );
};
