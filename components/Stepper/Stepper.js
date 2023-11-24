export const StepperComponent = ({ steps, currentStep, setCurrentStep }) => {
    const width = Math.floor(100 / steps.length);

    return (
        <div>
            <div className="w-[100%] flex justify-center items-center">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col justify-center items-center gap-4 cursor-pointer`}
                        style={{ width: `${width}%`, minWidth: "150px" }}
                        onClick={() => {
                            setCurrentStep(index);
                        }}
                    >
                        <div
                            className={`w-14 h-14 rounded-lg flex justify-center items-center ${
                                index > currentStep
                                    ? "bg-white/10 text-white"
                                    : "bg-[#F98222]/20 text-[#F98222]"
                            }`}
                        >
                            {index + 1}
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
        </div>
    );
};
