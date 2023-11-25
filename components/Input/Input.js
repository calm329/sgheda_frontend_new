import clsx from "clsx";
// existing code...

export const Input = ({
    label = "",
    name = "",
    type = "text",
    placeholder = "",
    error = false,
    badge = null, // new prop
    errorText = "",
    className = "",
    value = "",
    others,
    onChange = () => {}
}) => {
    return (
        <div className={clsx("relative w-full flex flex-col", className)}>
            <label htmlFor={name} className="mb-1 text-white text-title">
                {label}
            </label>
            <div class="relative">
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    {...others}
                    className={clsx(
                        "shadow appearance-none border text-content rounded w-full py-2 px-3 text-white bg-[#09112D] leading-tight focus:outline-none focus:shadow-outline",
                        { "border-red-500": error, "border-[#17234F]": !error }
                    )}
                />
                {badge && (
                    <span className="absolute inset-y-0 right-0 flex items-center px-4 py-2 text-sm font-medium leading-5 text-white/80 bg-transparent rounded-r-md">
                        {badge}
                    </span>
                )}
            </div>
            {error && <div className="text-red-500">{errorText}</div>}
        </div>
    );
};
