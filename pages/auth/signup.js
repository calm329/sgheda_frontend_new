import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { AuthLayout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import SEO from "@components/SEO/SEO";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useFormik } from "formik";
import signup_validation from "lib/formikValidation/signup_validation";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";

export default function SignUp() {
    const router = useRouter();
    const { addToast } = useToasts();
    const isMounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            password: ""
        },
        onSubmit: signup,
        validate: signup_validation
    });

    function signup(values) {
        setLoading(true);

        axios
            .post(`/api/auth/signup`, values)
            .then((result) => {
                signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                    callbackUrl: "/"
                }).then((status) => {
                    if (status?.error) {
                        addToast(status?.error, {
                            appearance: "error",
                            autoDismiss: true
                        });
                        return;
                    }
                    if (status?.ok) {
                        addToast("Account created successfully", {
                            appearance: "success",
                            autoDismiss: true
                        });
                        router.push("/auth/verify-email");
                    }
                });
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.message;
                if (errorMessage || error?.message) {
                    addToast(errorMessage || error?.message, {
                        appearance: "error",
                        autoDismiss: true
                    });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if (!isMounted.current) {
            addToast(
                "Sign up using your .edu email and gain access to exclusive university benefits. Don't miss out on this unique opportunity designed especially for the academic community. Let's learn and grow together!",
                {
                    appearance: "info",
                    autoDismiss: true
                }
            );
            isMounted.current = true;
        }
    }, [addToast]);

    return (
        <AuthLayout className="">
            <SEO title="Signup | SGHEDA" description="" />
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
                                <PageTitle
                                    className="lg:text-left text-white text-title !leading-sm text-center mx-auto flex flex-col"
                                    type="heavy"
                                >
                                    Sign Up
                                </PageTitle>
                                {/* <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white backdrop-filter backdrop-blur-md bg-opacity-10 h-1 rounded-xl my-4"></div> */}
                            </MotionBTTContainer>
                            <MotionBTTContainer
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="w-full md:w-1/2 2xl:w-[35%] mx-auto flex flex-col gap-4 mt-4">
                                    {/* <Button
                                        type="button"
                                        className="btn btn--secondary w-full mt-4 text-white lemonsqueezy-button flex flex-row"
                                        onClick={() => signIn("google")}
                                    >
                                        <Icon
                                            icon="devicon:google"
                                            className="w-6 h-6"
                                        />
                                        <span>Sign Up with Google</span>
                                    </Button>
                                    <div className="flex items-center mx-8">
                                        <div className="w-full h-0 border-dashed border-0 border-t-[1px] border-gray-300"></div>
                                        <span className="whitespace-nowrap mx-2 text-gray-300">
                                            or use your email
                                        </span>
                                        <div className="w-full h-0 border-dashed border-0 border-t-[1px] border-gray-300"></div>
                                    </div> */}
                                    <form
                                        onSubmit={formik.handleSubmit}
                                        className="w-full space-y-4 md:space-y-6"
                                        action="#"
                                    >
                                        <Input
                                            label="Full Name"
                                            name="name"
                                            placeholder="Full Name"
                                            {...formik.getFieldProps("name")}
                                            error={
                                                formik.touched.name &&
                                                formik.errors.name
                                            }
                                            errorText={formik.errors.name}
                                            className=""
                                        />
                                        <Input
                                            label="Email"
                                            name="email"
                                            placeholder="Email"
                                            {...formik.getFieldProps("email")}
                                            error={
                                                formik.touched.email &&
                                                formik.errors.email
                                            }
                                            errorText={formik.errors.email}
                                            className=""
                                        />
                                        <Input
                                            label="Password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            {...formik.getFieldProps(
                                                "password"
                                            )}
                                            error={
                                                formik.touched.password &&
                                                formik.errors.password
                                            }
                                            errorText={formik.errors.password}
                                            className=""
                                        />
                                        <div className="w-full flex flex-col justify-center items-center">
                                            <Button
                                                type="submit"
                                                loading={loading}
                                                className="btn btn--secondary w-full mt-4 text-white lemonsqueezy-button"
                                            >
                                                Sign Up with Email
                                            </Button>
                                            <Button
                                                type="button"
                                                className="btn btn--secondary w-full mt-4 text-white lemonsqueezy-button flex flex-row"
                                                onClick={() => signIn("google")}
                                            >
                                                <Icon
                                                    icon="devicon:google"
                                                    className="w-6 h-6"
                                                />
                                                <span>
                                                    Continue with Google
                                                </span>
                                            </Button>
                                        </div>
                                    </form>
                                    <div className="text-white text-center">
                                        <span>Already have an account? </span>
                                        <Link
                                            href={"/auth/signin"}
                                            className="underline text-[#F98222]"
                                        >
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </MotionBTTContainer>
                        </SectionContainer>
                    </SectionContainer>
                </SectionContainer>
            </div>
        </AuthLayout>
    );
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
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
}
