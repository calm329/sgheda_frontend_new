import React, { useState, useEffect } from "react";
import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";
import { Icon } from "@iconify/react";
import Image from "next/image";
import toast from "react-hot-toast";

export const ContactSection = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [message, setMessage] = useState(null);

    const emailPattern =
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name === null || name.trim() === "") {
            return toast.error("Please enter your name");
        } else if (email === null || email.trim() === "") {
            return toast.error("Please enter your email");
        } else if (!emailPattern.test(email)) {
            return toast.error("Please enter a valid email");
        } else if (message === null || message.trim() === "") {
            return toast.error("Please enter a message");
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/message`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            }
        );

        if (response.ok) {
            toast.success("Message sent successfully");
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <SectionContainer
            id={"contact"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/contact.jpg')] bg-cover bg-center no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-12 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="my-2 text-orange-400 text-content text-md">
                                    Contact Us
                                </div>
                                <h1 className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    Need assistance
                                </h1>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full lg:w-2/3 xl:w-1/2 mx-auto grid grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                name="fullname"
                                placeholder="Full Name"
                                onChange={(e) => setName(e.target.value)}
                                error={name !== null && name.trim() === ""}
                                errorText="Incorrect fullname"
                                className=""
                            />
                            <Input
                                label="Email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                error={
                                    email !== null &&
                                    (email.trim() === "" ||
                                        !emailPattern.test(email))
                                }
                                errorText="Incorrect email"
                                className=""
                            />
                            <Textarea
                                label="Message"
                                name="message"
                                placeholder="Message"
                                onChange={(e) => setMessage(e.target.value)}
                                error={
                                    message !== null && message.trim() === ""
                                }
                                errorText="Incorrect message"
                                className="col-span-2"
                            />
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                className="btn btn--secondary mx-auto col-span-2 my-4 text-white lemonsqueezy-button"
                            >
                                Send
                            </Button>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
