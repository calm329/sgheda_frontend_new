import clsx from "clsx";

export const Button = ({
    type,
    loading = false,
    disabled = false,
    children,
    className,
    ...others
}) => {
    const buttonClass = clsx(
        "btn disabled:cursor-not-allowed disabled:!opacity-50",
        className
    );

    return (
        <button
            disabled={loading || disabled}
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
