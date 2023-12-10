// import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Slider } from "primereact/slider";
import { useState } from "react";
import * as Yup from "yup";
import { useToasts } from "react-toast-notifications";
import { getServerSideProps } from "pages/auth/signup";
import { QrReader } from "react-qr-reader";
import { TabPanel, TabView } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { createCanvas, loadImage } from "canvas";
import jsQR from "jsqr";
import dynamic from "next/dynamic.js";

import "react-image-picker-editor/dist/index.css";
import { useRouter } from "next/router.js";

const ReactImagePickerEditor = dynamic(
    () => import("react-image-picker-editor"),
    { ssr: false } // this will load the module only on the client side
);

export const ProfileSection = (props) => {
    const { addToast } = useToasts();
    const { data: session, status, update } = useSession();
    const loading = status === "loading";
    const [qrcode, setQRCode] = useState(null);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [fundAmount, setFundAmount] = useState(300);

    const config2 = {
        borderRadius: "8px",
        language: "en",
        width: "330px",
        height: "250px",
        compressInitial: null,
        hideDeleteBtn: true,
        hideDownloadBtn: true,
        hideEditBtn: true,
        hideAddBtn: true
    };

    const initialImage = "";

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
        axios
            .post("/api/auth/change-password", {
                currentPassword: values.password,
                newPassword: values.newPassword
            })
            .then((res) => {
                if (res.status === 200) {
                    setIsLoading(false);
                    addToast("Password changed successfully", {
                        appearance: "success",
                        autoDismiss: true
                    });
                } else {
                    setIsLoading(false);
                    addToast("Password change failed", {
                        appearance: "error",
                        autoDismiss: true
                    });
                }
            })
            .catch((err) => {
                addToast(err.message, {
                    appearance: "error",
                    autoDismiss: true
                });
                console.log(err);
            });
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

    const addFunds = () => {
        axios
            .post("/api/addFund", {
                fundAmount
            })
            .then((res) => {
                const { data } = res;
                const { success, error, invoice_url } = data;

                if (success) {
                    window.location.href = invoice_url;
                } else {
                    addToast(error, {
                        appearance: "error",
                        autoDismiss: true
                    });
                    console.log(error);
                }
            })
            .catch((err) => {
                addToast(err.response.data.message, {
                    appearance: "error",
                    autoDismiss: true
                });
                console.log(err);
            });
    };

    async function handleResend() {
        axios
            .post("/api/auth/resend-email")
            .then((result) => {
                if (result.status === 200) {
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
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true
                });
            });
    }

    const getQRCode = (base64Image) => {
        loadImage(base64Image).then((image) => {
            const canvas = createCanvas(image.width, image.height);
            const context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            const imageData = context.getImageData(
                0,
                0,
                image.width,
                image.height
            );

            const code = jsQR(
                imageData.data,
                imageData.width,
                imageData.height
            );

            if (code) {
                console.log(`Decoded QR Code: ${code.data}`);
                setQRCode(code.data);
                addToast("QR Code decoded successfully.", {
                    appearance: "success",
                    autoDismiss: true
                });
            } else {
                console.log("Unable to decode the QR Code.");
                addToast("Unable to decode the QR Code.", {
                    appearance: "error",
                    autoDismiss: true
                });
            }
        });
    };

    const handleQrcodeClick = () =>
        qrcode ? setQRCode(null) : setVisible(true);

    const handleError = (err) => {
        console.error(err);
    };

    const handleScan = (data) => {
        if (data) {
            setQRCode(data);
            addToast("QR Code decoded successfully.", {
                appearance: "success",
                autoDismiss: true
            });
        }
    };

    const handleSubmitQRCode = async (e) => {
        e.preventDefault();

        if (qrcode) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/validateBalanceQR`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        qrcode,
                        email: props.userInfo.email
                    })
                }
            );

            if (res.ok) {
                const { success, message, balance } = await res.json();
                if (success) {
                    addToast(message, {
                        appearance: "success",
                        autoDismiss: true
                    });
                    setVisible(false);
                    update({ balance: balance });
                } else {
                    addToast(message, {
                        appearance: "error",
                        autoDismiss: true
                    });
                }
            } else {
                addToast("Something went wrong", {
                    appearance: "error",
                    autoDismiss: true
                });
            }
        } else {
            addToast("Please scan or upload a QR Code", {
                appearance: "error",
                autoDismiss: true
            });
        }
    };

    return !loading && session ? (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/resource.png')] bg-center bg-cover no-repeat">
                <SectionContainer className="w-full h-full p-4 pt-24 flex gap-4 justify-center flex-col rounded-lg">
                    <ConfirmDialog />
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        {!props.userInfo.verified && (
                            <div className="w-full text-content flex flex-col lg:flex-row justify-between gap-2 text-gray-300 bg-green-500/50 rounded-xl p-4 mb-2 text-md">
                                <span className="flex justify-start items-center gap-2">
                                    <Icon
                                        icon="emojione-v1:warning"
                                        className="min-w-[20px] min-h-[20px]"
                                    />
                                    Your account has not been verified. Please
                                    verify your account.{" "}
                                </span>
                                <div
                                    loading={loading}
                                    className="w-auto text-white lemonsqueezy-button bg-transparent underline cursor-pointer hover:text-orange-400 transition-all"
                                    onClick={handleResend}
                                >
                                    Resend Verification Email
                                </div>
                            </div>
                        )}
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="w-full mx-auto bg-[#1C2743]/40 rounded-xl p-8 flex gap-8">
                                <div className="">
                                    {session.user.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt="User avatar"
                                            className="min-w-[80px] min-h-[80px] rounded-full"
                                            width={80} // specify a size (replace these with the desired dimensions)
                                            height={80} // specify a size
                                        />
                                    ) : (
                                        <Icon
                                            icon="mingcute:user-4-fill"
                                            className="min-w-[80px] min-h-[80px] text-white"
                                        />
                                    )}
                                </div>
                                <div className="text-content overflow-hidden">
                                    <div className="text-white font-semibold text-3xl whitespace-nowrap text-ellipsis overflow-hidden">
                                        {session.user.name}
                                    </div>
                                    <div className="text-gray-300 font-semibold text-2xl whitespace-nowrap text-ellipsis overflow-hidden">
                                        {session.user.email}
                                    </div>
                                    {/* <div className="text-gray-300 mt-4 flex gap-4 justify-start items-center text-3xl">
                                        <Icon
                                            icon="entypo:credit"
                                            className="w-12 h-12 text-[#FED33A]"
                                        />
                                        100
                                    </div>
                                    <Slider
                                        value={value}
                                        onChange={(e) => setValue(e.value)}
                                        className="w-full mt-8"
                                    /> */}
                                </div>
                            </div>
                            <div className="w-full mx-auto bg-[#1C2743]/40 rounded-xl p-8 flex flex-col gap-8">
                                <div className="w-full rounded-xl">
                                    <div className="flex flex-col justify-center items-center">
                                        <form
                                            className="w-full"
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <Input
                                                label="Password"
                                                name="password"
                                                placeholder="Password"
                                                type="password"
                                                readOnly={session.user.image}
                                                {...formik.getFieldProps(
                                                    "password"
                                                )}
                                                error={
                                                    formik.touched.password &&
                                                    formik.errors.password
                                                }
                                                errorText={
                                                    formik.errors.password
                                                }
                                                className=""
                                            />
                                            <Input
                                                label="New Password"
                                                name="newPassword"
                                                readOnly={session.user.image}
                                                placeholder="New Password"
                                                type="password"
                                                {...formik.getFieldProps(
                                                    "newPassword"
                                                )}
                                                error={
                                                    formik.touched
                                                        .newPassword &&
                                                    formik.errors.newPassword
                                                }
                                                errorText={
                                                    formik.errors.newPassword
                                                }
                                                className=""
                                            />
                                            <Input
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                readOnly={session.user.image}
                                                placeholder="Confirm Password"
                                                type="password"
                                                {...formik.getFieldProps(
                                                    "confirmPassword"
                                                )}
                                                error={
                                                    formik.touched
                                                        .confirmPassword &&
                                                    formik.errors
                                                        .confirmPassword
                                                }
                                                errorText={
                                                    formik.errors
                                                        .confirmPassword
                                                }
                                                className=""
                                            />
                                            <div className="flex justify-end">
                                                <Button
                                                    type="submit"
                                                    loading={loading}
                                                    disabled={
                                                        session.user.image
                                                    }
                                                    className="btn btn--secondary w-auto mt-4 text-white lemonsqueezy-button"
                                                >
                                                    Change Password
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full grid grid-cols-1 gap-4">
                            <div className="w-full mx-auto bg-[#1C2743]/40 rounded-xl p-8 flex flex-col gap-8">
                                <div className="w-full rounded-xl">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="w-full text-white text-title text-xl md:text-2xl lg:text-3xl mb-8">
                                            Your account balance is $
                                            {session.balance}
                                        </div>
                                        <form
                                            className="w-full bg-white/10 p-4 rounded-xl"
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center">
                                                <div className="flex sm:flex-col gap-2 justify-center items-center">
                                                    <span className="text-white text-content text-xl">
                                                        Amount
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Icon
                                                            icon="entypo:credit"
                                                            className="w-12 h-12 text-[#FED33A]"
                                                        />
                                                        <span className="text-white text-3xl font-bold text-content">
                                                            {fundAmount}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <Slider
                                                        value={fundAmount}
                                                        min={10}
                                                        max={1000}
                                                        step={10}
                                                        onChange={(e) =>
                                                            setFundAmount(
                                                                e.value
                                                            )
                                                        }
                                                        className="w-full mt-8"
                                                    />
                                                    <div className="flex justify-between text-white text-content text-lg">
                                                        <span>$10</span>
                                                        <span>$1000</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center sm:justify-end">
                                                    <Button
                                                        type="button"
                                                        loading={loading}
                                                        className="btn btn--secondary w-auto mt-4 text-white lemonsqueezy-button"
                                                        onClick={addFunds}
                                                    >
                                                        Add Funds
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="w-full mt-8 flex items-center justify-center">
                                                <p className="text-content text-sm text-white">
                                                    Do you have a QR code? -{" "}
                                                    <input
                                                        type="checkbox"
                                                        id="qrcode"
                                                        name="qrcode"
                                                        checked={!!qrcode}
                                                        className="cursor-pointer"
                                                        onClick={
                                                            handleQrcodeClick
                                                        }
                                                    />
                                                    <span
                                                        htmlFor="qrcode"
                                                        className="text-orange-400 underline select-none cursor-pointer"
                                                        onClick={
                                                            handleQrcodeClick
                                                        }
                                                    >
                                                        {" "}
                                                        Scan it here
                                                    </span>
                                                </p>
                                            </div>
                                            <Dialog
                                                header={false}
                                                visible={visible}
                                                onHide={() => setVisible(false)}
                                                className="xl:w-[35%] lg:w-[40%] md:w-[60%] sm:w-[80%] w-[95%]"
                                                draggable={false}
                                                resizable={false}
                                            >
                                                <TabView>
                                                    <TabPanel
                                                        header="Scan QR Code"
                                                        className="p-0 text-sm flex flex-col justify-center items-center"
                                                        leftIcon="pi pi-camera mr-2"
                                                    >
                                                        <QrReader
                                                            delay={300}
                                                            onError={
                                                                handleError
                                                            }
                                                            onScan={handleScan}
                                                            className="w-full"
                                                        />
                                                        <Button
                                                            type="button"
                                                            onClick={
                                                                handleSubmitQRCode
                                                            }
                                                            className="btn btn--secondary mx-auto mt-4 text-white lemonsqueezy-button"
                                                        >
                                                            Confirm
                                                        </Button>
                                                    </TabPanel>
                                                    <TabPanel
                                                        header="Upload Image"
                                                        className="p-0 text-sm flex flex-col justify-center items-center"
                                                        leftIcon="pi pi-upload mr-2"
                                                    >
                                                        <ReactImagePickerEditor
                                                            config={config2}
                                                            imageSrcProp={
                                                                initialImage
                                                            }
                                                            imageChanged={(
                                                                newDataUri
                                                            ) => {
                                                                if (newDataUri)
                                                                    getQRCode(
                                                                        newDataUri
                                                                    );
                                                            }}
                                                        />
                                                        <Button
                                                            type="button"
                                                            onClick={
                                                                handleSubmitQRCode
                                                            }
                                                            className="btn btn--secondary mx-auto mt-4 text-white lemonsqueezy-button"
                                                        >
                                                            Confirm
                                                        </Button>
                                                    </TabPanel>
                                                </TabView>
                                            </Dialog>
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
