import React, { useState } from "react";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { StepperComponent } from "@components/Stepper";
import { ToggleLinkGroup } from "@components/ToggleLinkGroup";
import { Button } from "@components/Button";
import { SystemDesignSection } from "./SystemDesignSection";
import { FluidPropSection } from "./FluidPropSection";
import { SoilPropSection } from "./SoilPropSection";
import { PipeDesignSection } from "./PipeDesignSection";
import { PumpInfoSection } from "./PumpInfoSection";
import { DesignResultSection } from "./DesignResultSection";
import { Formik, Field, useFormikContext } from "formik";
import * as Yup from "yup";

const toggleLinks = [
    {
        name: "Room Load Calculator",
        link: "/calculator/rlc"
    },
    {
        name: "SGHEDA",
        link: "/calculator/sgheda"
    },
    {
        name: "EAHED",
        link: "/calculator/eahed"
    },
    {
        name: "Interior Finish Selection",
        link: "/calculator/ifs"
    }
];

const steps = [
    {
        name: "System Design",
        icon: ""
    },
    {
        name: "Fluid Properties",
        icon: ""
    },
    {
        name: "Soil Properties",
        icon: ""
    },
    {
        name: "Pipe Design",
        icon: ""
    },
    {
        name: "Pump Info",
        icon: ""
    },
    {
        name: "Design Result",
        icon: ""
    },
    {
        name: "Analysis",
        icon: ""
    }
];

export const SGHEDA = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const validationSchema = Yup.object().shape({
        system: Yup.object().shape({
            heatLoad: Yup.number(),
            inputFluidTemperature: Yup.number(),
            type: Yup.string()
        }),
        fluid: Yup.object().shape({
            fluidType: Yup.string(),
            viscosity: Yup.number(),
            specificHeat: Yup.number(),
            density: Yup.number()
        }),
        soil: Yup.object().shape({
            thermalConductivity: Yup.number(),
            thermalDiffusivity: Yup.number(),
            groundTemperature: Yup.number(),
        }),
        pipe: Yup.object().shape({
            outerDiameter: Yup.number(),
            innerDiameter: Yup.number(),
            pipeConductivity: Yup.number(),
            buriedDepth: Yup.number(),
        }),
        pump: Yup.object().shape({
            requiredPower: Yup.number(),
            fluidVelocity: Yup.number(),
            pumpMotorEfficiency: Yup.number(),
        })
    })

    return (
        <SectionContainer
            id={"sgheda"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg p-12 md:px-12 px-4">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <ToggleLinkGroup toggleLinks={toggleLinks} />
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-[95%] h-full bg-[#09112D] mx-auto p-4 py-8 rounded-3xl">
                            <StepperComponent
                                steps={steps}
                                currentStep={currentStep}
                                setCurrentStep={setCurrentStep}
                            />
                            <div className="w-full bg-white backdrop-filter backdrop-blur-md bg-opacity-10 h-1 rounded-xl my-4"></div>

                            {currentStep === 0 && <SystemDesignSection />}
                            {currentStep === 1 && <FluidPropSection />}
                            {currentStep === 2 && <SoilPropSection />}
                            {currentStep === 3 && <PipeDesignSection />}
                            {currentStep === 4 && <PumpInfoSection />}
                            {currentStep === 5 && <DesignResultSection />}

                            <div className="w-full flex justify-between">
                                <Button
                                    type="button"
                                    className="btn btn--black w-auto mt-4 text-white flex flex-row"
                                    onClick={() => {
                                        setCurrentStep(currentStep - 1);
                                    }}
                                >
                                    <span>Previous</span>
                                </Button>
                                <Button
                                    type="button"
                                    className="btn btn--secondary w-auto mt-4 text-white lemonsqueezy-button flex flex-row"
                                    onClick={() => {
                                        setCurrentStep(currentStep + 1);
                                    }}
                                >
                                    <span>Next</span>
                                </Button>
                                {currentStep === 5 && (
                                    <Button
                                        type="button"
                                        className="btn btn--black w-auto mt-4 text-white flex flex-row"
                                        onClick={() => {
                                            setCurrentStep(currentStep - 1);
                                        }}
                                    >
                                        <span>Go to Analysis</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
