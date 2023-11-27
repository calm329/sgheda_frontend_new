import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { AuthLayout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import SEO from "@components/SEO/SEO";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import signin_validation from "lib/formikValidation/signin_validation";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

export default function SignIn() {
    const router = useRouter();

    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: signin_validation,
        onSubmit: LoginSubmit
    });

    async function LoginSubmit(values) {
        console.log(values);
        setLoading(true);
        try {
            const status = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe,
                callbackUrl: "/"
            });
            if (status?.error) throw Error(status?.error);
            if (status?.ok) {
                addToast("Login successfully", {
                    appearance: "success",
                    autoDismiss: true
                });
                router.push("/");
            }

            setLoading(false);
        } catch (error) {
            addToast(error?.message, {
                appearance: "error",
                autoDismiss: true
            });
            setLoading(false);
        }
    }

    return (
        <AuthLayout className="">
            <SEO title="Signin | SGHEDA" description="" />
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
                                    Sign In
                                </PageTitle>
                                {/* <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white backdrop-filter backdrop-blur-md bg-opacity-10 h-1 rounded-xl my-4"></div> */}
                            </MotionBTTContainer>
                            <MotionBTTContainer
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="w-full md:w-1/2  2xl:w-[35%] mx-auto flex flex-col gap-4 mt-4">
                                    {/* <Button
                                        type="button"
                                        className="btn btn--secondary w-full mt-4 text-white lemonsqueezy-button flex flex-row"
                                        onClick={() => signIn("google")}
                                    >
                                        <Icon
                                            icon="devicon:google"
                                            className="w-6 h-6"
                                        />
                                        <span>Sign In with Google</span>
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
                                        <div className="flex justify-between items-center">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                    name="rememberMe"
                                                    checked={
                                                        formik.values.rememberMe
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />
                                                <span className="ml-2 text-white">
                                                    Remember me
                                                </span>
                                            </label>
                                            <Link
                                                href={"/auth/forgot-password"}
                                                className="text-white underline"
                                            >
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <div className="w-full flex flex-col justify-center items-center">
                                            <Button
                                                type="submit"
                                                loading={loading}
                                                className="btn btn--secondary w-full mt-4 text-white lemonsqueezy-button"
                                            >
                                                Sign In with Email
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
                                        <div className="text-white text-center">
                                            <span>
                                                You don't have account?{" "}
                                            </span>
                                            <Link
                                                href={"/auth/signup"}
                                                className="underline text-[#F98222]"
                                            >
                                                Sign Up
                                            </Link>
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
