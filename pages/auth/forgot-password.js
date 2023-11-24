import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { AuthLayout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import SEO from "@components/SEO/SEO";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import axios from "axios";
import { useFormik } from "formik";
import forgotpassword_validation from "lib/formikValidation/forgotpassword_validation";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

export default function ForgotPassword() {
    const router = useRouter();
    const { addToast } = useToasts();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: { email: "" },
        validate: forgotpassword_validation,
        onSubmit: PasswordResetSubmit
    });

    async function PasswordResetSubmit(values) {
        setLoading(true);
        axios
            .post("/api/auth/forgot-password", values)
            .then((result) => {
                if (result.status === 200) {
                    setLoading(false);
                    addToast(result.data.message, {
                        appearance: "success",
                        autoDismiss: true
                    });
                } else {
                    setLoading(false);
                    addToast(result.data.message, {
                        appearance: "error",
                        autoDismiss: true
                    });
                }
            })
            .catch((error) => {
                setLoading(false);
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true
                });
            });
        setLoading(false);
    }

    return (
        <AuthLayout className="">
            <SEO title="Forgot Password | SGHEDA" description="" />
            <div className="main-wrapper relative z-10">
                <SectionContainer className="page-banner--container h-screen relative p-4">
                    <SectionContainer
                        className="page-banner--inner-container relative w-full h-full p-4 z-10 flex bg-black/20 bg-center bg-no-repeat lg:flex-row flex-col rounded-lg gap-4"
                        style={{
                            background:
                                'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.30) 100%), linear-gradient(0deg, rgba(9, 17, 45, 0.90) -0.26%, rgba(9, 17, 45, 0.00) 99.28%), url("/images/background/home.jpg")',
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            backgroundPosition: "center 30%",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}
                    >
                        <SectionContainer className="w-full h-full flex justify-center flex-col rounded-lg bg-[#09112D]/30 p-12 md:px-20 lg:px-40 xl:px-64">
                            <MotionBTTContainer
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <button
                                    onClick={() => router.back()}
                                    className="absolute top-8 left-8 flex justify-center items-center text-white hover:text-orange-400"
                                >
                                    ↶ Go back
                                </button>
                                <PageTitle
                                    className="lg:text-left text-white text-title !leading-sm text-center mx-auto flex flex-col"
                                    type="heavy"
                                >
                                    Forgot Your Password?
                                </PageTitle>
                            </MotionBTTContainer>
                            <MotionBTTContainer
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="w-full mx-auto flex flex-col gap-4 mt-4">
                                    <div className="text-white text-center">
                                        <p>
                                            Enter the email address associated
                                            with your account and we’ll send you
                                            a link to reset your password.
                                        </p>
                                        <p>
                                            Be sure to check your spam folder if
                                            you can't find it in your primary
                                            inbox.
                                        </p>
                                    </div>
                                    <form
                                        onSubmit={formik.handleSubmit}
                                        className="w-full space-y-4 md:space-y-6"
                                    >
                                        <Input
                                            label="Email"
                                            name="email"
                                            placeholder="Email"
                                            className="w-auto max-w-md mx-auto"
                                            {...formik.getFieldProps("email")}
                                            error={
                                                formik.touched.email &&
                                                formik.errors.email
                                            }
                                            errorText={formik.errors.email}
                                        />
                                        <div className="w-full flex justify-center items-center">
                                            <Button
                                                type="submit"
                                                loading={loading}
                                                className="btn btn--secondary w-auto mt-4 text-white lemonsqueezy-button"
                                            >
                                                Reset Password
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </MotionBTTContainer>
                        </SectionContainer>
                    </SectionContainer>
                </SectionContainer>
            </div>
        </AuthLayout>
    );
}

export const getServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    return {
        props: { session }
    };
};
