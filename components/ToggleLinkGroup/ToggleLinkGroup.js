import Link from "next/link";
import { useRouter } from "next/router";

export const ToggleLinkGroup = ({ toggleLinks }) => {
    const router = useRouter();

    return (
        <div className="flex justify-center">
            <div className={`flex w-auto bg-[#09112D] gap-4 p-2 rounded-lg`}>
                {toggleLinks.map((link) => (
                    <div
                        key={link.name}
                        className={`${
                            router.pathname === link.link
                                ? "bg-[#526781]/70"
                                : "bg-[#526781]/10"
                        } ${
                            router.pathname === link.link
                                ? "text-[#FFFFFF]"
                                : "text-[#FFFFFF]/60"
                        } text-content text-md p-4 rounded-lg`}
                    >
                        <Link href={link.link}>{link.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
