import { Button } from "@components/Button";
import { CountrySelect } from "@components/CountrySelect";
import { Input } from "@components/Input";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { QrReader } from "react-qr-reader";
import { createCanvas, loadImage } from "canvas";
// import ReactImagePickerEditor from "react-image-picker-editor";
import dynamic from "next/dynamic";

const ReactImagePickerEditor = dynamic(
    () => import("react-image-picker-editor"),
    { ssr: false } // this will load the module only on the client side
);

import jsQR from "jsqr";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import "react-image-picker-editor/dist/index.css";

const cardData = [
    {
        title: "Beginner",
        subtitle: "Starter-Friendly Tools",
        price: 150,
        pros: [
            "Ideal for creative newcomers",
            "Allows up to 20 designs",
            "Explore our basic tools",
            "No analysis option"
        ]
    },
    {
        title: "Pro",
        subtitle: "More Power & Insight",
        price: 250,
        pros: [
            "Perfect for regular users",
            "20 designs and 20 analyses",
            "Offers advanced tools",
            "Provides critical insights"
        ]
    },
    {
        title: "Unlimited",
        subtitle: "All Access, No Boundaries",
        price: 500,
        pros: [
            "Unrestricted access to platform",
            "Infinite designs and analyses",
            "Ideal for heavy users or teams",
            "Freedom without limits"
        ]
    }
];

export const BillingSection = () => {
    const router = useRouter();
    let { price } = router.query;

    if (!price) price = "150";

    const card = cardData.find((c) => c.price === parseInt(price));

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [machineNumber, setMachineNumber] = useState(null);
    const [country, setCountry] = useState(null);
    const [visible, setVisible] = useState(false);
    const [qrcode, setQRCode] = useState(null);

    const config2 = {
        borderRadius: "8px",
        language: "en",
        width: "330px",
        height: "250px",
        objectFit: "contain",
        compressInitial: null,
        hideDeleteBtn: true,
        hideDownloadBtn: true,
        hideEditBtn: true,
        hideAddBtn: true
    };
    // const initialImage: string = '/assets/images/8ptAya.webp';
    const initialImage = "";

    const emailPattern =
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;

    const handleScan = (data) => {
        if (data) {
            setQRCode(data);
            toast.success("QR Code decoded successfully.");
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

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
                toast.success("QR Code decoded successfully.");
            } else {
                console.log("Unable to decode the QR Code.");
                toast.error("Unable to decode the QR Code.");
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === null || name.trim() === "") {
            return toast.error("Please enter your name");
        } else if (email === null || email.trim() === "") {
            return toast.error("Please enter your email");
        } else if (!emailPattern.test(email)) {
            return toast.error("Please enter a valid email");
        } else if (machineNumber === null || machineNumber.trim() === "") {
            return toast.error("Please enter your machine number");
        } else if (country === null || country.trim() === "") {
            return toast.error("Please select your country");
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/license/invoice`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    machineNumber,
                    price,
                    country,
                    qrcode
                })
            }
        );

        if (res.ok) {
            const data = await res.json();
            const { qrcode } = data;
            if (qrcode) {
                const { success, message } = data;
                if (success) toast.success(message);
                else toast.error(message);
            } else {
                const { invoice_url } = data;
                if (invoice_url) {
                    window.location.href = invoice_url;
                } else {
                    toast.error("Something went wrong");
                }
            }
        } else {
            toast.error("Something went wrong");
        }
    };

    const handleSubmitQRCode = async (e) => {
        e.preventDefault();

        if (qrcode) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/validateQR`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        qrcode
                    })
                }
            );

            if (res.ok) {
                const { success, message } = await res.json();
                if (success) {
                    toast.success(message);
                    setVisible(false);
                } else {
                    toast.error(message);
                }
            } else {
                toast.error("Something went wrong");
            }
        } else {
            toast.error("Please scan or upload a QR Code");
        }
    };

    return (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/team.jpg')] bg-cover no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-12 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full mx-auto flex flex-col md:flex-row gap-8">
                            <div className="min-w-[300px] max-w-[300px] rounded-xl mx-auto flex flex-col bg-[#09112D] p-8 border-orange-400 border">
                                <Image
                                    src="/small-logo.png"
                                    width={35}
                                    height={35}
                                    alt="small sgheda logo"
                                    objectFit="cover"
                                    loading="lazy"
                                    className="mb-4"
                                />
                                <div className="text-content text-white text-2xl font-semibold">
                                    {card.title}
                                </div>
                                <div className="text-content text-gray-300 text-sm">
                                    {card.subtitle}
                                </div>
                                <div className="mt-8">
                                    <div className="text-content text-lg text-white">
                                        $
                                    </div>
                                    <div className="text-content leading-none">
                                        <span className="text-white leading-none text-title text-[4rem] font-extrabold ml-4">
                                            {card.price}
                                        </span>
                                        <span className="text-gray-300 leading-none text-content text-sm">
                                            {" "}
                                            / month
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-[3px] rounded-lg bg-black-400 my-4"></div>
                                <div className="flex flex-col gap-2 mt-4">
                                    {card.pros.map((pro, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4"
                                        >
                                            <Icon
                                                icon="uil:check"
                                                className="bg-orange-400 rounded-full w-5 h-5 p-1"
                                            />
                                            <span className="text-content text-sm text-white">
                                                {pro}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full lg:w-2/3 rounded-xl">
                                <div className="flex flex-col justify-center items-center">
                                    <div className="my-2 text-orange-400 text-content text-md">
                                        License
                                    </div>
                                    <div className="text-title uppercase text-3xl text-white font-bold">
                                        Billing details
                                    </div>
                                    <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                                </div>
                                <div className="w-full grid grid-cols-2 gap-4">
                                    <Input
                                        label="Full Name"
                                        name="fullname"
                                        placeholder="Full Name"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        error={
                                            name !== null && name.trim() === ""
                                        }
                                        errorText="Incorrect fullname"
                                        className=""
                                    />
                                    <Input
                                        label="Email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        error={
                                            email !== null &&
                                            (email.trim() === "" ||
                                                !emailPattern.test(email))
                                        }
                                        errorText="Incorrect email"
                                        className=""
                                    />
                                    <Input
                                        label="Machine Number"
                                        name="machine-number"
                                        placeholder="Machine Number"
                                        onChange={(e) =>
                                            setMachineNumber(e.target.value)
                                        }
                                        error={
                                            machineNumber !== null &&
                                            machineNumber.trim() === ""
                                        }
                                        errorText="Incorrect machine number"
                                        className="col-span-2"
                                    />
                                    <CountrySelect
                                        label="Country"
                                        name="country"
                                        className="w-full col-span-2 sm:col-span-1"
                                        handleChange={(e) => setCountry(e)}
                                    />
                                    <div className="sm:hidden"></div>
                                    <Button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="btn btn--secondary mx-auto mt-auto text-white lemonsqueezy-button"
                                    >
                                        GET
                                    </Button>
                                </div>
                                <div className="w-full mt-8">
                                    <p className="text-content text-sm text-white">
                                        Do you have a QR code? -{" "}
                                        <input
                                            type="checkbox"
                                            id="qrcode"
                                            name="qrcode"
                                            checked={!!qrcode}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                qrcode
                                                    ? setQRCode(null)
                                                    : setVisible(true)
                                            }
                                        />
                                        <span
                                            htmlFor="qrcode"
                                            className="text-orange-400 underline select-none cursor-pointer"
                                            onClick={() =>
                                                qrcode
                                                    ? setQRCode(null)
                                                    : setVisible(true)
                                            }
                                        >
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
                                                onError={handleError}
                                                onScan={handleScan}
                                                className="w-full"
                                            />
                                            <Button
                                                type="button"
                                                onClick={handleSubmitQRCode}
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
                                                imageSrcProp={initialImage}
                                                imageChanged={(newDataUri) => {
                                                    if (newDataUri)
                                                        getQRCode(newDataUri);
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                onClick={handleSubmitQRCode}
                                                className="btn btn--secondary mx-auto mt-4 text-white lemonsqueezy-button"
                                            >
                                                Confirm
                                            </Button>
                                        </TabPanel>
                                    </TabView>
                                </Dialog>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
