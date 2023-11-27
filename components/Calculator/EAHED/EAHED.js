import { Button } from "@components/Button";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { StepperComponent } from "@components/Stepper";
import axios from "axios";
import { Form, Formik } from "formik";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Input } from "@components/Input";
import { SystemDesignSection } from "./SystemDesignSection";
import { useToasts } from "react-toast-notifications";

const toggleLinks = [
    {
        name: "Room Load Calculator",
        link: "/calculator/rlc"
    },
    {
        name: "EAHED",
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
        name: "Design Result",
        icon: "/images/calculator/sgheda/design_result.svg"
    },
    {
        name: "Analysis",
        icon: "/images/calculator/sgheda/analysis.svg"
    }
];

export const EAHED = () => {
    const { addToast } = useToasts();
    const [currentStep, setCurrentStep] = useState(-1);
    const [result, setResult] = useState(null);
    const [maxStep, setMaxStep] = useState(0);

    const validationSchema = Yup.object().shape({
        loopType: Yup.number().nullable().required("Loop Type is required"),
        heatLoad: Yup.number()
            .nullable()
            .test(
                "gt-zero",
                "Value must be greater than zero",
                (val) => val > 0
            )
            .required("Heat Load is required"),
        groundTemp: Yup.number()
            .nullable()
            .test(
                "gt-zero",
                "Value must be greater than zero",
                (val) => val > 0
            )
            .required("Ground Temperature is required"),
        roomTemp: Yup.number()
            .nullable()
            .test(
                "gt-zero",
                "Value must be greater than zero",
                (val) => val > 0
            )
            .required("Room Temperature is required"),
        outsideTemp: Yup.number()
            .nullable()
            .test({
                name: "outsideTemp",
                message:
                    "Outside Temp is required and must be greater than zero",
                test: function (val) {
                    const { loopType } = this.parent;
                    if (loopType === 0) {
                        return val !== null && val > 0;
                    }
                    return true;
                }
            }),
        pipeInnerDiameter: Yup.number()
            .nullable()
            .test(
                "gt-zero",
                "Value must be greater than zero",
                (val) => val > 0
            )
            .required("Pipe Inner Diameter is required"),
        pipeOuterDiameter: Yup.number()
            .nullable()
            .test(
                "gt-zero",
                "Value must be greater than zero",
                (val) => val > 0
            )
            .required("Pipe Outer Diameter is required"),
        pipeMaterial: Yup.string().required("Pipe Material is required"),
        buriedDepth: Yup.number()
            .nullable()
            .test(
                "gt-zero",
                "Value must be greater than zero",
                (val) => val > 0
            )
            .required("Buried Depth is required"),
        fanVelocity: Yup.number()
            .nullable()
            .test(
                "gt-zero",
                "Value must be greater than zero",
                (val) => val > 0
            )
            .required("Fan Velocity is required")
    });

    let initialValues = {};

    try {
        if (localStorage.getItem("EAHED"))
            initialValues = JSON.parse(localStorage.getItem("EAHED"));
        else throw new Error();
    } catch (error) {
        initialValues = {
            loopType: 0,
            heatLoad: null,
            groundTemp: null,
            roomTemp: null,
            pipeInnerDiameter: null,
            pipeOuterDiameter: null,
            pipeMaterial: "Clay",
            outsideTemp: null,
            buriedDepth: null,
            fanVelocity: null
        };
    }

    function handleSubmit(values, actions) {
        console.log("SDFSDF", currentStep);
        if (currentStep === 0) {
            console.log(values);
            confirmDialog({
                message: "Are you sure you want to submit?",
                header: "Confirmation",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    axios
                        .post("/api/calculator/eahed/calculate", {
                            inputData: values
                        })
                        .then((result) => {
                            if (result.status === 200) {
                                localStorage.setItem(
                                    "EAHED",
                                    JSON.stringify(values)
                                );
                                localStorage.setItem(
                                    "EAHED.currentStep",
                                    Math.max(maxStep, currentStep + 1)
                                );

                                setResult(result.data.data);
                                localStorage.setItem(
                                    "EAHED.designResult",
                                    JSON.stringify(result.data.data)
                                );

                                setMaxStep(Math.max(maxStep, currentStep + 1));
                                setCurrentStep(currentStep + 1);
                            } else {
                                addToast(result.data.message, {
                                    appearance: "error",
                                    autoDismiss: true
                                });
                            }
                        })
                        .catch((err) => {
                            addToast(err.response.data.message, {
                                appearance: "error",
                                autoDismiss: true
                            });
                        });
                },
                reject: () => {}
            });
            // actions.setSubmitting(false);
        } else if (currentStep === 1) {
            setCurrentStep(0);
            setResult(null);
            setMaxStep(0);
            localStorage.removeItem("EAHED");
            localStorage.removeItem("EAHED.currentStep");
            localStorage.removeItem("EAHED.designResult");
            actions.resetForm({
                values: {
                    loopType: 0,
                    heatLoad: 0,
                    groundTemp: 0,
                    roomTemp: 0,
                    pipeInnerDiameter: 0,
                    pipeOuterDiameter: 0,
                    pipeMaterial: "Clay",
                    outsideTemp: 0,
                    buriedDepth: 0,
                    fanVelocity: 0
                }
            });
        }
    }

    function handleBack() {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    }

    const footer = (className) => {
        return (
            <div className={`w-full flex ${className} justify-between`}>
                {currentStep === 0 && (
                    <Button
                        type="submit"
                        className="btn btn--secondary w-auto ml-auto mt-4 text-white flex flex-row"
                    >
                        <span>Calculate</span>
                    </Button>
                )}
                {currentStep === 1 && (
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
                            onClick={() => {}}
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
                localStorage.getItem("EAHED.currentStep")
                    ? parseInt(localStorage.getItem("EAHED.currentStep"))
                    : 0
            );

            setResult(
                localStorage.getItem("EAHED.designResult")
                    ? JSON.parse(localStorage.getItem("EAHED.designResult"))
                    : null
            );

            setMaxStep(
                localStorage.getItem("EAHED.currentStep")
                    ? parseInt(localStorage.getItem("EAHED.currentStep"))
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
                    <ConfirmDialog />
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
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    {[0, 1].includes(currentStep) && (
                                        <SystemDesignSection footer={footer} />
                                    )}
                                </Form>
                            </Formik>
                            {result?.pipeLength && (
                                <div>
                                    <div className="w-full flex justify-center items-center">
                                        <span className="w-full bg-white backdrop-filter backdrop-blur-md bg-opacity-10  h-[2px] rounded-xl"></span>
                                        <span className="text-white font-semibold text-lg text-title whitespace-nowrap mx-2">
                                            Design Result
                                        </span>
                                        <span className="w-full bg-white backdrop-filter backdrop-blur-md bg-opacity-10  h-[2px] rounded-xl"></span>
                                    </div>
                                    <div>
                                        <Input
                                            type="number"
                                            label="Pipe Length"
                                            readOnly
                                            value={result?.pipeLength}
                                            className="max-w-[300px]"
                                            badge="m"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
