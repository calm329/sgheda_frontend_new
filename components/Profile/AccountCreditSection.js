// import { Button } from "@components/Button";
import { Button } from "primereact/button";
import { Input } from "@components/Input";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Slider } from "primereact/slider";

export const AccountCreditSection = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(null);

    const validationSchema = Yup.object({
        password: Yup.string().required("Password is required"),
        newPassword: Yup.string().required("New password is required"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("newPassword"), null],
            "Passwords must match"
        )
    });

    const PasswordChangeSubmit = (values) => {
        confirmDialog({
            message: "Are you sure you want to change your password?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => handleChangePassword(values),
            reject: () => {}
        });
    };

    const handleChangePassword = (values) => {
        setIsLoading(true);
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: PasswordChangeSubmit
    });

    return !loading && session ? (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/resource.png')] bg-center bg-cover no-repeat">
                <SectionContainer className="w-full h-full p-4 flex gap-12 justify-center flex-col rounded-lg">
                    <ConfirmDialog />
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full grid grid-cols-1 gap-4">
                            <div className="w-full mx-auto bg-[#1C2743]/40 rounded-xl p-8 flex flex-col gap-8">
                                <div className="w-full rounded-xl">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="w-full text-white text-title text-3xl mb-8">
                                            Your account balance is $100
                                        </div>
                                        <form
                                            className="w-full grid grid-cols-3 items-center bg-white/10 p-4 rounded-xl"
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <div className="flex flex-col gap-2 items-center">
                                                <span className="text-white text-content text-xl">
                                                    Amount
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Icon
                                                        icon="entypo:credit"
                                                        className="w-12 h-12 text-[#FED33A]"
                                                    />
                                                    <span className="text-white text-3xl font-bold text-content">
                                                        {value}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <Slider
                                                    value={value}
                                                    min={10}
                                                    max={1000}
                                                    step={10}
                                                    onChange={(e) =>
                                                        setValue(e.value)
                                                    }
                                                    className="w-full mt-8"
                                                />
                                                <div className="flex justify-between text-white text-content text-lg">
                                                    <span>$10</span>
                                                    <span>$1000</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    type="submit"
                                                    loading={loading}
                                                    className="btn btn--secondary w-auto mt-4 text-white lemonsqueezy-button"
                                                >
                                                    Add Funds
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    ) : (
        <></>
    );
};
