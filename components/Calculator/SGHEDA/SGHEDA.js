import React, { useState, useEffect } from "react";
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
import { Formik, Form } from "formik";
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
        icon: "/images/calculator/sgheda/system_design.svg"
    },
    {
        name: "Fluid Properties",
        icon: "/images/calculator/sgheda/fluid_properties.svg"
    },
    {
        name: "Soil Properties",
        icon: "/images/calculator/sgheda/soil_properties.svg"
    },
    {
        name: "Pipe Design",
        icon: "/images/calculator/sgheda/pipe_design.svg"
    },
    {
        name: "Pump Info",
        icon: "/images/calculator/sgheda/pump_info.svg"
    },
    {
        name: "Design Result",
        icon: "/images/calculator/sgheda/design_result.svg"
    },
    {
        name: "Analysis",
        icon: "/images/calculator/sgheda/analysis.svg"
    }
];

export const SGHEDA = () => {
    const [currentStep, setCurrentStep] = useState(-1);
    const [maxStep, setMaxStep] = useState(0);

    const validationSchema = [
        Yup.object().shape({
            system: Yup.object().shape({
                heatLoad: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Heat Load is required"),
                inputFluidTemperature: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Input Fluid Temperature is required"),
                type: Yup.number().required("Ring Type is required")
            })
        }),
        Yup.object().shape({
            fluid: Yup.object().shape({
                fluidType: Yup.string().required("Fluid Type is required"),
                viscosity: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Viscosity is required"),
                specificHeat: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Specific Heat is required"),
                density: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Density is required")
            })
        }),
        Yup.object().shape({
            soil: Yup.object().shape({
                thermalConductivity: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Thermal Conductivity is required"),
                thermalDiffusivity: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Thermal Diffusivity is required"),
                groundTemperature: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Ground Temperature is required")
            })
        }),
        Yup.object().shape({
            pipe: Yup.object().shape({
                outerDiameter: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Outer Diameter is required"),
                innerDiameter: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Inner Diameter is required"),
                pipeConductivity: Yup.number().required(
                    "Pipe Conductivity is required"
                ),
                buriedDepth: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Buried Depth is required")
            })
        }),
        Yup.object().shape({
            pump: Yup.object().shape({
                requiredPower: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Required Power is required"),
                fluidVelocity: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Fluid Velocity is required"),
                pumpMotorEfficiency: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Pump Motor Efficiency is required")
            })
        })
    ];

    let initialValues = {};

    try {
        initialValues = JSON.parse(localStorage.getItem("SGHEDA"));
    } catch (error) {
        initialValues = {
            system: {
                heatLoad: null,
                inputFluidTemperature: null,
                type: 0
            },
            fluid: {
                fluidType: "Water",
                viscosity: null,
                specificHeat: null,
                density: null
            },
            soil: {
                thermalConductivity: null,
                thermalDiffusivity: null,
                groundTemperature: null
            },
            pipe: {
                outerDiameter: null,
                innerDiameter: null,
                pipeConductivity: null,
                buriedDepth: null
            },
            pump: {
                requiredPower: null,
                fluidVelocity: null,
                pumpMotorEfficiency: null
            }
        };
    }

    function handleSubmit(values, actions) {
        if (currentStep === 5) {
            actions.setSubmitting(false);

            setMaxStep(Math.max(maxStep, currentStep + 1));
            setCurrentStep(currentStep + 1);
        } else {
            localStorage.setItem("SGHEDA", JSON.stringify(values));
            localStorage.setItem(
                "currentStep",
                Math.max(maxStep, currentStep + 1)
            );

            setMaxStep(Math.max(maxStep, currentStep + 1));
            setCurrentStep(currentStep + 1);
            actions.setSubmitting(false);
        }
    }

    function handleBack() {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    }

    // const formik = useFormik({
    //     initialValues,
    //     validationSchema: Yup.lazy(
    //         (values) =>
    //             validationSchema[currentStep] ||
    //             Yup.object().shape({
    //                 /* default validation schema if `currentStep`  is out of range */
    //             })
    //     ),
    //     onSubmit: async (values, actions) => {
    //         console.log(values, "SDF");
    //         if (Object.keys(formik.errors).length === 0) {
    //             if (currentStep === validationSchema.length - 1) {
    //                 // conclude form
    //                 console.log("Final values", values);
    //             } else {
    //                 // Go to next step
    //                 setCurrentStep(currentStep + 1);
    //             }
    //         }
    //         actions.setSubmitting(false);
    //     }
    // });

    // useEffect(() => {
    //     formik.setTouched({});
    //     formik.setErrors({});
    //     formik.setValues(initialValues, false);
    //     formik.setValidationSchema(validationSchema[currentStep]);
    // }, [currentStep]);

    const footer = (className) => {
        return (
            <div className={`w-full flex ${className} justify-between`}>
                {currentStep > 0 && currentStep < 5 && (
                    <Button
                        type="button"
                        className="btn btn--black w-auto mt-4 text-white flex flex-row"
                        onClick={handleBack}
                    >
                        <span>Previous</span>
                    </Button>
                )}

                {currentStep === 5 && (
                    <Button
                        type="button"
                        className="btn btn--black w-auto mt-4 text-white flex flex-row"
                        onClick={handleBack}
                    >
                        <span>Save Design</span>
                    </Button>
                )}

                {currentStep < 5 && (
                    <Button
                        type="submit"
                        className="btn btn--secondary w-auto ml-auto mt-4 text-white lemonsqueezy-button flex flex-row"
                    >
                        {currentStep === 4 ? "Calculate" : "Next"}
                    </Button>
                )}
                {currentStep === 5 && (
                    <>
                        <Button
                            type="submit"
                            className="btn btn--secondary w-auto mt-4 text-white lemonsqueezy-button flex flex-row"
                        >
                            Redesign
                        </Button>
                        <Button
                            type="button"
                            className="btn btn--black w-auto mt-4 text-white flex flex-row"
                            onClick={() => {
                                setCurrentStep(currentStep - 1);
                            }}
                        >
                            <span>Go to Analysis</span>
                        </Button>
                    </>
                )}
            </div>
        );
    };

    useEffect(() => {
        if (currentStep === -1) {
            setCurrentStep(
                localStorage.getItem("currentStep")
                    ? parseInt(localStorage.getItem("currentStep"))
                    : 0
            );

            setMaxStep(
                localStorage.getItem("currentStep")
                    ? parseInt(localStorage.getItem("currentStep"))
                    : 0
            );
        }
    });

    return (
        <SectionContainer
            id={"sgheda"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/calculator.jpg')] bg-center bg-cover no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 bg-[#09112D]/80 justify-center flex-col rounded-lg p-12 md:px-12 px-4">
                    {/* <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <ToggleLinkGroup toggleLinks={toggleLinks} />
                    </MotionBTTContainer> */}
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="relative w-[95%] h-full bg-[#09112D] mx-auto p-4 py-8 rounded-3xl overflow-hidden">
                            <StepperComponent
                                steps={steps}
                                currentStep={currentStep}
                                maxStep={maxStep}
                                setCurrentStep={setCurrentStep}
                            />
                            <div className="w-full bg-white backdrop-filter backdrop-blur-md bg-opacity-10 h-1 rounded-xl my-4"></div>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema[currentStep]}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    {currentStep === 0 && (
                                        <SystemDesignSection footer={footer} />
                                    )}
                                    {currentStep === 1 && (
                                        <FluidPropSection footer={footer} />
                                    )}
                                    {currentStep === 2 && (
                                        <SoilPropSection footer={footer} />
                                    )}
                                    {currentStep === 3 && (
                                        <PipeDesignSection footer={footer} />
                                    )}
                                    {currentStep === 4 && (
                                        <PumpInfoSection footer={footer} />
                                    )}
                                    {currentStep === 5 && (
                                        <DesignResultSection footer={footer} />
                                    )}
                                </Form>
                            </Formik>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
