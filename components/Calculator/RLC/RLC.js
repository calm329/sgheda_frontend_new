import { Button, ButtonGroup } from "@components/Button";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { StepperComponent } from "@components/Stepper";
import axios from "axios";
import { Form, Formik } from "formik";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { DesignResultSection } from "./DesignResultSection";
import { GroundFloorSection } from "./GroundFloorSection";
import { WindowsSection } from "./WindowsSection";
import { TempSection } from "./TempSection";
import { RoofSection } from "./RoofSection";
import { ExternalWallsSection } from "./ExternalWallsSection";
// import { AnalysisSection } from "./AnalysisSection";
import { useToasts } from "react-toast-notifications";
import { Icon } from "@iconify/react";

const steps = [
    {
        name: "External Walls",
        origin_icon: "/images/calculator/rlc/external_walls_white.svg",
        active_icon: "/images/calculator/rlc/external_walls_orange.svg"
    },
    {
        name: "Ground Floor",
        origin_icon: "/images/calculator/rlc/ground_floor_white.svg",
        active_icon: "/images/calculator/rlc/ground_floor_orange.svg"
    },
    {
        name: "Roof",
        origin_icon: "/images/calculator/rlc/roof_white.svg",
        active_icon: "/images/calculator/rlc/roof_orange.svg"
    },
    {
        name: "Windows",
        origin_icon: "/images/calculator/rlc/window_white.svg",
        active_icon: "/images/calculator/rlc/window_orange.svg"
    },
    {
        name: "Temperature",
        origin_icon: "/images/calculator/rlc/temperature_white.svg",
        active_icon: "/images/calculator/rlc/temperature_orange.svg"
    },
    {
        name: "Design Result",
        origin_icon: "/images/calculator/rlc/design_result_white.svg",
        active_icon: "/images/calculator/rlc/design_result_orange.svg"
    }
];

export const RLC = () => {
    const { addToast } = useToasts();
    const inputRef = useRef(null);
    const resetRef = useRef(null);
    const exportRef = useRef(null);
    const analysisRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(-1);
    const [result, setResult] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);
    const [maxStep, setMaxStep] = useState(0);
    const [analyzing, setAnalyzing] = useState(false);

    const validationSchema = [
        Yup.object().shape({
            externalWalls: Yup.object().shape({
                materials: Yup.array().of(
                    Yup.object().shape({
                        material: Yup.string().required("Material is required"),
                        thickness: Yup.number()
                            .test(
                                "gt-zero",
                                "Value must be greater than zero",
                                (val) => val > 0
                            )
                            .required("Thickness is required"),
                        thermalConductivity: Yup.number()
                            .test(
                                "gt-zero",
                                "Value must be greater than zero",
                                (val) => val > 0
                            )
                            .required("Thermal Conductivity is required")
                    })
                ),
                area: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Area is required")
            })
        }),
        Yup.object().shape({
            groundFloor: Yup.object().shape({
                materials: Yup.array().of(
                    Yup.object().shape({
                        material: Yup.string().required("Material is required"),
                        thickness: Yup.number()
                            .test(
                                "gt-zero",
                                "Value must be greater than zero",
                                (val) => val > 0
                            )
                            .required("Thickness is required"),
                        thermalConductivity: Yup.number()
                            .test(
                                "gt-zero",
                                "Value must be greater than zero",
                                (val) => val > 0
                            )
                            .required("Thermal Conductivity is required")
                    })
                ),
                area: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Area is required")
            })
        }),
        Yup.object().shape({
            roof: Yup.object().shape({
                materials: Yup.array().of(
                    Yup.object().shape({
                        material: Yup.string().required("Material is required"),
                        thickness: Yup.number()
                            .test(
                                "gt-zero",
                                "Value must be greater than zero",
                                (val) => val > 0
                            )
                            .required("Thickness is required"),
                        thermalConductivity: Yup.number()
                            .test(
                                "gt-zero",
                                "Value must be greater than zero",
                                (val) => val > 0
                            )
                            .required("Thermal Conductivity is required")
                    })
                ),
                area: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Area is required")
            })
        }),
        Yup.object().shape({
            windows: Yup.object().shape({
                window: Yup.string().required("Window is required"),
                rValue: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Outer Diameter is required"),
                area: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Inner Diameter is required")
            })
        }),
        Yup.object().shape({
            temp: Yup.object().shape({
                innerTemp: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Required Power is required"),
                outerTemp: Yup.number()
                    .test(
                        "gt-zero",
                        "Value must be greater than zero",
                        (val) => val > 0
                    )
                    .required("Fluid Velocity is required")
            })
        })
    ];

    let initialValues = {};

    try {
        if (localStorage.getItem("RLC"))
            initialValues = JSON.parse(localStorage.getItem("RLC"));
        else throw new Error();
    } catch (error) {
        initialValues = {
            externalWalls: {
                materials: [
                    {
                        material: "",
                        thickness: 0,
                        thermalConductivity: 0
                    }
                ],
                area: 0
            },
            groundFloor: {
                materials: [
                    {
                        material: "",
                        thickness: 0,
                        thermalConductivity: 0
                    }
                ],
                area: 0
            },
            roof: {
                materials: [
                    {
                        material: "",
                        thickness: 0,
                        thermalConductivity: 0
                    }
                ],
                area: 0
            },
            windows: {
                window: "",
                rValue: 0,
                area: 0
            },
            temp: {
                innerTemp: 0,
                outerTemp: 0
            }
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
                    for (const schema of validationSchema) {
                        try {
                            await schema.validate(importedData.inputData);
                        } catch (error) {
                            addToast(error.message, {
                                appearance: "error",
                                autoDismiss: true
                            });
                            return;
                        }
                    }

                    formikProps.setValues(importedData?.inputData); // Update the form data here

                    localStorage.setItem(
                        "RLC",
                        JSON.stringify(importedData?.inputData)
                    );
                    localStorage.setItem("RLC.currentStep", 5);

                    setResult(importedData?.outputData);
                    localStorage.setItem(
                        "RLC.designResult",
                        JSON.stringify(importedData?.outputData)
                    );

                    setMaxStep(5);
                    setCurrentStep(5);
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
        localStorage.removeItem("RLC");
        localStorage.removeItem("RLC.currentStep");
        localStorage.removeItem("RLC.designResult");

        props.resetForm({
            values: {
                externalWalls: {
                    materials: [
                        {
                            material: "",
                            thickness: 0,
                            thermalConductivity: 0
                        }
                    ],
                    area: 0
                },
                groundFloor: {
                    materials: [
                        {
                            material: "",
                            thickness: 0,
                            thermalConductivity: 0
                        }
                    ],
                    area: 0
                },
                roof: {
                    materials: [
                        {
                            material: "",
                            thickness: 0,
                            thermalConductivity: 0
                        }
                    ],
                    area: 0
                },
                windows: {
                    window: "",
                    rValue: 0,
                    area: 0
                },
                temp: {
                    innerTemp: 0,
                    outerTemp: 0
                }
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

        let exportFileDefaultName = `${Date.now()}.RLC.gld`;

        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
    };

    function handleSubmit(values, actions) {
        if (currentStep === 4) {
            confirmDialog({
                message: `This will use ${process.env.NEXT_PUBLIC_RLC_CREDIT_AMOUNT} USD. \n Are you sure you want to submit?`,
                header: "Confirmation",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    axios
                        .post("/api/calculator/rlc/calculate", {
                            inputData: values
                        })
                        .then((result) => {
                            if (result.status === 200) {
                                localStorage.setItem(
                                    "RLC",
                                    JSON.stringify(values)
                                );
                                localStorage.setItem(
                                    "RLC.currentStep",
                                    Math.max(maxStep, currentStep + 1)
                                );

                                setResult(result.data.data);
                                localStorage.setItem(
                                    "RLC.designResult",
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
        } else if (currentStep === 5) {
            setCurrentStep(0);
            setResult(null);
            setMaxStep(0);
            localStorage.removeItem("RLC");
            localStorage.removeItem("RLC.currentStep");
            localStorage.removeItem("RLC.designResult");
            actions.resetForm({
                values: {
                    externalWalls: {
                        materials: [
                            {
                                material: "",
                                thickness: 0,
                                thermalConductivity: 0
                            }
                        ],
                        area: 0
                    },
                    groundFloor: {
                        materials: [
                            {
                                material: "",
                                thickness: 0,
                                thermalConductivity: 0
                            }
                        ],
                        area: 0
                    },
                    roof: {
                        materials: [
                            {
                                material: "",
                                thickness: 0,
                                thermalConductivity: 0
                            }
                        ],
                        area: 0
                    },
                    windows: {
                        window: "",
                        rValue: 0,
                        area: 0
                    },
                    temp: {
                        innerTemp: 0,
                        outerTemp: 0
                    }
                }
            });
        } else {
            localStorage.setItem("RLC", JSON.stringify(values));
            localStorage.setItem(
                "RLC.currentStep",
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

    function handleAnalysis(props) {
        if (currentStep === 5) {
            confirmDialog({
                message: `This will use ${process.env.NEXT_PUBLIC_RLC_CREDIT_AMOUNT} USD. \n Are you sure you want to analysis?`,
                header: "Confirmation",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    const data = {
                        ...props.values,
                        results: result
                    };

                    setAnalyzing(true);

                    axios
                        .post("/api/calculator/rlc/analysis", {
                            data
                        })
                        .then((result) => {
                            if (result.status === 200) {
                                if (!analyzing) {
                                    addToast("Analyzed successfully", {
                                        appearance: "info",
                                        autoDismiss: true
                                    });
                                }
                                console.log(result.data.data);
                                // localStorage.setItem("RLC", JSON.stringify(values));
                                localStorage.setItem(
                                    "RLC.currentStep",
                                    Math.max(maxStep, currentStep + 1)
                                );

                                // setResult(result.data.data);
                                localStorage.setItem(
                                    "RLC.analysisResult",
                                    JSON.stringify(result.data.data)
                                );

                                setMaxStep(Math.max(maxStep, currentStep + 1));
                                setCurrentStep(currentStep + 1);
                                setAnalysisData(result.data.data);

                                setAnalyzing(false);
                            } else {
                                addToast(result.data.message, {
                                    appearance: "error",
                                    autoDismiss: true
                                });

                                setAnalyzing(false);
                            }
                        })
                        .catch((err) => {
                            addToast(err.response.data.message, {
                                appearance: "error",
                                autoDismiss: true
                            });

                            setAnalyzing(false);
                        });
                },
                reject: () => {}
            });
        }
    }

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

                {/* {currentStep === 5 && (
                    <Button
                        type="submit"
                        className="btn btn--black w-auto mt-4 text-white flex flex-row"
                    >
                        <span>Save Design</span>
                    </Button>
                )} */}

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
                        {/* <Button
                            type="button"
                            className="btn btn--black w-auto mt-4 text-white flex flex-row"
                            onClick={() => analysisRef.current?.click()}
                        >
                            <span>Go to Analysis</span>
                        </Button> */}
                    </>
                )}
            </div>
        );
    };

    useEffect(() => {
        if (currentStep === -1) {
            setCurrentStep(
                localStorage.getItem("RLC.currentStep")
                    ? parseInt(localStorage.getItem("RLC.currentStep"))
                    : 0
            );

            setResult(
                localStorage.getItem("RLC.designResult")
                    ? JSON.parse(localStorage.getItem("RLC.designResult"))
                    : null
            );

            setMaxStep(
                localStorage.getItem("RLC.currentStep")
                    ? parseInt(localStorage.getItem("RLC.currentStep"))
                    : 0
            );

            setAnalysisData(
                localStorage.getItem("RLC.analysisResult")
                    ? JSON.parse(localStorage.getItem("RLC.analysisResult"))
                    : null
            );
        }
    }, [currentStep]);

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
                                    disabled={maxStep < 5}
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
                        <div className="relative w-[95%] h-full bg-[#09112D] mx-auto p-4 py-8 rounded-3xl">
                            {analyzing && (
                                <div className="absolute flex items-center justify-center left-0 top-0 right-0 bottom-0 bg-black/75 z-10">
                                    <div
                                        className="absolute top-4 right-4"
                                        onClick={() => setAnalyzing(false)}
                                    >
                                        <Icon
                                            icon="humbleicons:times"
                                            className="w-12 h-12 mx-auto text-gray-400 cursor-pointer hover:text-red-400 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <Icon
                                            icon="eos-icons:bubble-loading"
                                            className="w-16 h-16 mx-auto text-orange-400"
                                        />
                                        <p className="text-white text-center text-content mt-2">
                                            Analyzing...
                                        </p>
                                    </div>
                                </div>
                            )}
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
                                validationSchema={validationSchema[currentStep]}
                                onSubmit={handleSubmit}
                            >
                                {(props) => (
                                    <Form>
                                        {currentStep === 0 && (
                                            <ExternalWallsSection
                                                footer={footer}
                                            />
                                        )}
                                        {currentStep === 1 && (
                                            <GroundFloorSection
                                                footer={footer}
                                            />
                                        )}
                                        {currentStep === 2 && (
                                            <RoofSection footer={footer} />
                                        )}
                                        {currentStep === 3 && (
                                            <WindowsSection footer={footer} />
                                        )}
                                        {currentStep === 4 && (
                                            <TempSection footer={footer} />
                                        )}
                                        {currentStep === 5 && (
                                            <DesignResultSection
                                                footer={footer}
                                                data={result}
                                            />
                                        )}
                                        {/* {currentStep === 6 && (
                                            <AnalysisSection
                                                footer={footer}
                                                data={analysisData}
                                            />
                                        )} */}
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
                                            <button
                                                type="button"
                                                className="hidden"
                                                onClick={() =>
                                                    handleAnalysis(props)
                                                }
                                                ref={analysisRef}
                                            >
                                                Go to Analysis
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
