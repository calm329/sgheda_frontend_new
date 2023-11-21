import { Button } from "@components/Button";
import { AuthLayout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import SEO from "@components/SEO/SEO";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { useRouter } from "next/router";
import { useState } from "react";

export default function VerifyEmail() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { token } = router.query; // Extract token from query parameters

    async function handleResend() {
        setLoading(true);
        // Insert the function to resend the verification email here
        // ...
        setLoading(false);
    }

    return (
        <AuthLayout className="">
            <SEO title="Verify Email | SGHEDA" description="" />
            <div className="main-wrapper relative z-10">
                <SectionContainer className="page-banner--container h-screen relative p-4">
                    <SectionContainer
                        className="page-banner--inner-container relative w-full h-full p-4 z-10 flex bg-black/20 bg-center bg-no-repeat lg:flex-row flex-col rounded-lg gap-4"
                        style={{
                            background:
                                'linear-gradient(0deg, rgba(0,0,0, 0.2) 100%, rgba(0,0,0, 0.3) 100%), linear-gradient(0deg, rgba(9, 17, 45, 0.9) -0.26%, rgba(9, 17, 45, 0.0) 99.28%), url("/images/background/home.jpg")',
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
                                    Verify Your Email
                                </PageTitle>
                            </MotionBTTContainer>
                            <MotionBTTContainer
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="w-full mx-auto flex flex-col gap-4 mt-4">
                                    <div className="text-white text-center">
                                        <p>
                                            We have sent you an email with a
                                            verification link. Please check your
                                            inbox and click on the link to
                                            verify your email address.
                                        </p>
                                        <p>
                                            If you can't find the email in your
                                            inbox, check your spam folder or
                                            click the button below to resend the
                                            verification email.
                                        </p>
                                    </div>
                                    <div className="w-full flex justify-center items-center">
                                        <Button
                                            type="button"
                                            loading={loading}
                                            className="btn btn--secondary w-auto mt-4 text-white lemonsqueezy-button"
                                            onClick={handleResend}
                                        >
                                            Resend Verification Email
                                        </Button>
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
