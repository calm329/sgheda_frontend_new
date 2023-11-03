import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const navigation = [
    { name: "Home", to: "/", href: "/" },
    { name: "Resource", to: "resource", href: "/resource" },
    { name: "Collective", to: "company", href: "/collective" },
    { name: "License", to: "#license", href: "/#license" },
    { name: "Contact Us", to: "#contact", href: "/#contact" }
];

export const Nav = () => {
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
                        {navigation.map((item) => (
                            <li
                                key={item.name}
                                className="header-nav--menu-item"
                            >
                                <Link
                                    href={item.href}
                                    className={`menu-item--link text-white flex items-center hover:text-[#F98222] ${
                                        router.asPath === item.href
                                            ? "text-[#F98222]"
                                            : ""
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
