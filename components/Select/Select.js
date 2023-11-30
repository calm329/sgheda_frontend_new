import React from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";

export const Select = ({
    label = "",
    name = "",
    options = [],
    error = false,
    readOnly = false,
    errorText = "",
    className = "",
    onChange = () => {}
}) => {
    return (
        <div className={clsx("relative w-full flex flex-col", className)}>
            <label htmlFor={name} className="mb-1 text-white text-title">
                {label}
            </label>
            <div class="relative">
                <select
                    name={name}
                    onChange={onChange}
                    disabled={readOnly}
                    className={clsx(
                        "shadow appearance-none border text-content rounded w-full py-2 px-3 text-white bg-[#09112D] leading-tight focus:outline-none focus:shadow-outline",
                        { "border-red-500": error, "border-[#17234F]": !error }
                    )}
                >
                    {options.map((option, index) => (
                        <option value={option.value} key={index}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/80">
                    <Icon icon="tabler:chevron-down" />
                </div>
            </div>
            {error && <div className="text-red-500">{errorText}</div>}
        </div>
    );
};
