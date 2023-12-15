import { Button, ButtonGroup } from "@components/Button";
import { Input } from "@components/Input";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { StepperComponent } from "@components/Stepper";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useEffect, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";
import { SystemDesignSection } from "./SystemDesignSection";

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
        origin_icon: "/images/calculator/sgheda/system_design_white.svg",
        active_icon: "/images/calculator/sgheda/system_design_orange.svg"
    },
    {
        name: "Design Result",
        origin_icon: "/images/calculator/sgheda/design_result_white.svg",
        active_icon: "/images/calculator/sgheda/design_result_orange.svg"
    },
    {
        name: "Analysis",
        origin_icon: "/images/calculator/sgheda/analysis_white.svg",
        active_icon: "/images/calculator/sgheda/analysis_orange.svg"
    }
];

export const EAHED = () => {
    const { addToast } = useToasts();
    const inputRef = useRef(null);
    const resetRef = useRef(null);
    const exportRef = useRef(null);
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

    // Function to handle file
    const handleImportDesignFile = (e, formikProps) => {
        let file = e.target.files[0];

        // Ensure a file was selected
        if (file) {
            const reader = new FileReader();

            reader.onload = async (event) => {
                const fileContent = event.target.result;

                try {
                    const importedData = JSON.parse(fileContent);
                    console.log(importedData);

                    // Validate imported data
                    try {
                        await validationSchema.validate(importedData.inputData);
                    } catch (error) {
                        addToast(error.message, {
                            appearance: "error",
                            autoDismiss: true
                        });
                        return;
                    }

                    formikProps.setValues(importedData?.inputData); // Update the form data here

                    localStorage.setItem(
                        "EAHED",
                        JSON.stringify(importedData?.inputData)
                    );
                    localStorage.setItem("EAHED.currentStep", 1);

                    setResult(importedData?.outputData);
                    localStorage.setItem(
                        "EAHED.designResult",
                        JSON.stringify(importedData?.outputData)
                    );

                    setMaxStep(1);
                    setCurrentStep(1);
                } catch (error) {
                    console.log(error);
                }
            };

            // Read the file as text
            reader.readAsText(file);

            // Clear the selected files
            e.target.value = "";
        }
    };

    // Clear and export functions
    const handleClearForm = (props) => {
        setCurrentStep(0);
        setResult(null);
        setMaxStep(0);
        localStorage.removeItem("EAHED");
        localStorage.removeItem("EAHED.currentStep");
        localStorage.removeItem("EAHED.designResult");

        props.resetForm({
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
    };

    const handleExportForm = (props) => {
        const data = {
            inputData: props.values,
            outputData: result
        };
        const dataStr = JSON.stringify(data);
        const dataUri =
            "data:application/json;charset=utf-8," +
            encodeURIComponent(dataStr);

        let exportFileDefaultName = `${Date.now()}.EAHED.gld`;

        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
    };

    function handleSubmit(values, actions) {
        console.log("SDFSDF", currentStep);
        if (currentStep === 0) {
            console.log(values);
            confirmDialog({
                message: `This will use ${process.env.NEXT_PUBLIC_EAHED_CREDIT_AMOUNT} USD. \n Are you sure you want to submit?`,
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
                        <div className="relative w-[95%] flex justify-end gap-4 p-4 mx-auto">
                            <Button
                                type="submit"
                                className="btn btn--black w-auto text-white lemonsqueezy-button flex flex-row"
                                onClick={() => {
                                    resetRef.current?.click();
                                }}
                            >
                                Clear
                            </Button>
                            <ButtonGroup alignment={"center"} className="gap-0">
                                <Button
                                    type="submit"
                                    className="btn btn--secondary w-auto text-white lemonsqueezy-button flex flex-row p-2 rounded-r-none"
                                    onClick={() => {
                                        inputRef.current?.click();
                                    }}
                                >
                                    <Icon
                                        icon="bx:import"
                                        className="w-6 h-6"
                                    />
                                </Button>
                                <div className="w-[1px] h-10 my-auto bg-white/30"></div>
                                <Button
                                    type="submit"
                                    disabled={maxStep < 1}
                                    className="btn btn--secondary w-auto text-white lemonsqueezy-button flex flex-row p-2 rounded-l-none"
                                    onClick={() => {
                                        exportRef.current?.click();
                                    }}
                                >
                                    <Icon
                                        icon="bx:export"
                                        className="w-6 h-6"
                                    />
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="relative w-[95%] h-full bg-[#09112D] mx-auto p-4 py-8 rounded-3xl overflow-hidden">
                            <div className="w-full py-2 overflow-hidden">
                                <StepperComponent
                                    steps={steps}
                                    currentStep={currentStep}
                                    maxStep={maxStep}
                                    setCurrentStep={setCurrentStep}
                                />
                            </div>
                            <div className="w-full bg-white backdrop-filter backdrop-blur-md bg-opacity-10 h-1 rounded-xl my-4"></div>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {(props) => (
                                    <Form>
                                        {[0, 1].includes(currentStep) && (
                                            <SystemDesignSection
                                                footer={footer}
                                            />
                                        )}
                                        <div>
                                            <input
                                                type="file"
                                                id="jsonFile"
                                                accept=".gld"
                                                className="hidden"
                                                ref={inputRef}
                                                onChange={(e) =>
                                                    handleImportDesignFile(
                                                        e,
                                                        props
                                                    )
                                                } // Pass props to the function here
                                            />
                                            <button
                                                type="button"
                                                className="hidden"
                                                onClick={() =>
                                                    handleClearForm(props)
                                                }
                                                ref={resetRef}
                                            >
                                                Clear Form
                                            </button>
                                            <button
                                                type="button"
                                                className="hidden"
                                                onClick={() =>
                                                    handleExportForm(props)
                                                }
                                                ref={exportRef}
                                            >
                                                Export Form
                                            </button>
                                        </div>
                                    </Form>
                                )}
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
