import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react";

export const AvatarWithMenu = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    return !loading && session ? (
        <div
            className="relative ml-4 flex items-center justify-center"
            ref={ref}
        >
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                data-collapse-toggle="profile-menu"
                type="button"
                className=""
                aria-controls="navbar-dropdown"
                aria-expanded="false"
            >
                <span className="sr-only">Open main menu</span>
                {session.user.image ? (
                    <Image
                        src={session.user.image}
                        alt="User avatar"
                        className="rounded-full"
                        width={40} // specify a size (replace these with the desired dimensions)
                        height={40} // specify a size
                    />
                ) : (
                    <Icon
                        icon="mingcute:user-4-fill"
                        className="w-10 h-10 text-white"
                    />
                )}
            </button>

            <div
                className={`absolute right-0 w-[150px] top-12 my-1 flex flex-col gap-6 p-2 font-medium bg-[#111A32] ml-auto rounded-2xl border-0 ${
                    menuOpen ? "show" : "hide"
                } z-20`}
                id="profile-menu"
            >
                <Link
                    href={"/profile"}
                    className={`rounded py-2 pl-3 pr-4 transition-colors duration-300 flex items-center hover:text-[#F98222] text-white`}
                >
                    My Profile
                </Link>
                <div className="w-full h-[1px] bg-gray-500" />
                <div
                    className={`rounded py-2 pl-3 pr-4 transition-colors duration-300 flex items-center hover:text-[#F98222] text-white cursor-pointer`}
                    onClick={() =>
                        signOut({ callbackUrl: window.location.origin })
                    }
                >
                    SignOut
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};
