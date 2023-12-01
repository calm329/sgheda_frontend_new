import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Draggable from "react-draggable";

export const StepperComponent = ({
    steps,
    currentStep,
    setCurrentStep,
    maxStep
}) => {
    const parentRef = useRef();
    const [bounds, setBounds] = useState({ left: 0, right: 100 });

    const width = Math.floor(100 / steps.length);

    useEffect(() => {
        if (parentRef.current) {
            // calculate pixel values from percentages
            const limit =
                parentRef.current.offsetWidth < 150 * steps.length
                    ? (150 * steps.length - parentRef.current.offsetWidth) / 2
                    : 0;
            setBounds({ left: -limit, right: limit });
        }
    }, [steps.length]);

    return (
        <div ref={parentRef}>
            <Draggable
                axis="x"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                scale={1}
                bounds={bounds}
            >
                <div className="w-[100%] flex justify-center items-center select-none">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col justify-center items-center gap-4 cursor-pointer`}
                            style={{ width: `${width}%`, minWidth: "150px" }}
                            onClick={() => {
                                if (index <= maxStep) setCurrentStep(index);
                            }}
                        >
                            <div
                                className={`w-14 h-14 rounded-lg flex justify-center items-center hover:scale-110 transition-all duration-300 ${
                                    index > currentStep
                                        ? "bg-white/10 text-white"
                                        : "bg-[#F98222]/20 text-[#F98222]"
                                }`}
                            >
                                <Image
                                    src={
                                        index > currentStep
                                            ? step.origin_icon
                                            : step.active_icon
                                    }
                                    width={40}
                                    height={40}
                                    alt="Commercial"
                                    loading="lazy"
                                    className={`w-8 h-8`}
                                />
                            </div>
                            <span
                                className={`${
                                    index > currentStep
                                        ? "text-white/60"
                                        : "text-white"
                                } text-content`}
                            >
                                {step.name}
                            </span>
                            {index > 0 && (
                                <div
                                    className={`h-[2px] top-7 ${
                                        index > currentStep
                                            ? "bg-white/20"
                                            : "bg-white"
                                    } absolute`}
                                    style={{
                                        left: "calc((-50% + 50px) - 8px)",
                                        right: "calc((50% + 50px) - 8px)"
                                    }}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </Draggable>
        </div>
    );
};
