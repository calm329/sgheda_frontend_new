import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";

const navigation = [
    { name: "Home", to: "/", href: "/" },
    { name: "Calculator", to: "/calculator", href: "/calculator" },
    { name: "Resource", to: "resource", href: "/resource" },
    { name: "Collective", to: "collective", href: "/collective" },
    { name: "License", to: "#license", href: "/#license" },
    { name: "Contact Us", to: "#contact", href: "/#contact" },
    { name: "Sign In", to: "/auth/signin", href: "/auth/signin" }
];

export const Nav = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const router = useRouter();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const closeNav = () => {
        setIsNavOpen(false);
    };
    return (
        <nav className="header-nav">
            <div className="header-nav--container">
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="mobile-menu"
                    aria-controls="navbar-dropdown"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <Icon
                        icon="material-symbols:menu-rounded"
                        className="h-6 w-auto text-white"
                    />
                </button>
                <div
                    className={`header-nav--menu-container z-20 ${
                        isNavOpen ? "show" : "hide"
                    }`}
                    id="navbar-default"
                >
                    <ul
                        className={`header-nav--menu ${
                            isNavOpen
                                ? "bg-[#111A32] ml-auto rounded-2xl mt-8 w-2/3 sm:w-1/2"
                                : ""
                        } border-0`}
                    >
                        {navigation
                            .slice(
                                0,
                                !loading && session
                                    ? navigation.length - 1
                                    : navigation.length
                            )
                            .map((item) => (
                                <li
                                    key={item.name}
                                    className="header-nav--menu-item"
                                >
                                    <Link
                                        href={item.href}
                                        className={`menu-item--link flex items-center hover:text-[#F98222] ${
                                            router.asPath === item.href
                                                ? "text-[#F98222]"
                                                : "text-white"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
