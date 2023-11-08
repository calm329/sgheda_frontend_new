import { Button } from "@components/Button";
import { CountrySelect } from "@components/CountrySelect";
import { Input } from "@components/Input";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

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

    const emailPattern =
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;

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
                    country
                })
            }
        );

        if (res.ok) {
            const { invoice_url } = await res.json();
            if (invoice_url) {
                toast.success("Invoice created successfully");
                window.open(invoice_url);
            } else {
                toast.error("Invalid invoice url");
            }
        } else {
            toast.error("Something went wrong");
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
                                        handleChange={(e) => setCountry(e)}
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="btn btn--secondary mx-auto mt-auto text-white lemonsqueezy-button"
                                    >
                                        GET
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
