import { Icon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";

const ButtonVariant = {
    primary: "btn--primary",
    secondary: "btn--secondary",
    outline: "btn--outline",
    black: "btn--black"
};

export const Button = ({
    children,
    icon,
    href = "",
    type = "link",
    variant = "primary",
    onClick = () => {},
    className = ""
}) => {
    const Element = type === "button" ? "button" : Link;
    const variantClass = ButtonVariant[variant];
    const buttonClass = clsx("btn", variantClass, className);
    return (
        <Element
            href={href}
            onClick={onClick}
            role="button"
            className={buttonClass}
        >
            {children}
            {icon?.length && <Icon icon={icon} />}
        </Element>
    );
};
