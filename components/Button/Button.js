import { Icon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";

const ButtonVariant = {
    primary: "btn--primary",
    secondary: "btn--secondary",
    outline: "btn--outline",
    black: "btn--black"
};

// export const Button = ({
//     children,
//     icon,
//     href = "",
//     type = "",
//     variant = "primary",
//     onClick = () => {},
//     className = ""
// }) => {
//     const variantClass = ButtonVariant[variant];
//     const buttonClass = clsx("btn", variantClass, className);
//     return (
//         <Button onClick={onClick} type={type} className={buttonClass}>
//             {children}
//             {icon?.length && <Icon icon={icon} />}
//         </Button>
//     );
// };
export const Button = ({
    type,
    loading = false,
    children,
    className,
    ...others
}) => {
    const buttonClass = clsx("btn", className);

    return (
        <button
            disabled={loading}
            {...others}
            type={type || "button"}
            className={buttonClass}
        >
            {children}

            {loading ? (
                <span className="block w-6 h-6 rounded-full animate-spin border-4 border-r-transparent"></span>
            ) : (
                <></>
            )}
        </button>
    );
};
