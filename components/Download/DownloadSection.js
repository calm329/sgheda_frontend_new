import { Button } from "@components/Button";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import Image from "next/image";

export const DownloadSection = () => {
    return (
        <SectionContainer className="page-banner--container p-4 pb-0">
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/payment.jpg')] bg-cover no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 justify-center flex-col rounded-lg bg-[#09112D]/80 p-12 px-12">
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full mx-auto flex flex-col md:flex-row gap-8">
                            <div className="xl:w-1/3 md:w-1/2 rounded-xl">
                                <div className="flex flex-col justify-center items-start">
                                    <div className="my-2 text-orange-400 text-content text-md">
                                        Software
                                    </div>
                                    <div className="text-title text-3xl uppercase text-white font-bold">
                                        Get your software now
                                    </div>
                                    <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                                </div>
                                <div className="text-content text-gray-300 text-lg">
                                    Our design tool is your gateway to
                                    creativity and innovation. Whether
                                    you&apos;re a seasoned professional or a
                                    beginner, our intuitive platform simplifies
                                    the design process, making it accessible to
                                    all. Here&apos;s how it works:
                                </div>
                            </div>
                            <div className="xl:w-1/3 md:w-1/2 m-auto h-fit relative">
                                <Image
                                    src="/app.png"
                                    width={640}
                                    height={40}
                                    alt="SGHEDA Software"
                                    loading="lazy"
                                    className="rounded-lg w-full"
                                />
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <table className="w-full">
                            <thead className="text-title text-white text-left">
                                <tr>
                                    <th>Version</th>
                                    <th>Download</th>
                                    <th>Published</th>
                                    <th>What&apos;s New?</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-content text-gray-300">
                                <tr>
                                    <td>1.0.0</td>
                                    <td>135</td>
                                    <td>a year ago</td>
                                    <td>
                                        <span>
                                            Neque porro quisquam est qui dolorem
                                            ipsum quia dolor sit
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            type="link"
                                            href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=software`}
                                            className="btn btn--secondary md:inline-flex hidden text-white lemonsqueezy-button"
                                        >
                                            Download Now
                                        </Button>
                                        <Button
                                            type="link"
                                            href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=software`}
                                            className="btn md:hidden btn--secondary text-white lemonsqueezy-button"
                                        >
                                            ⬇
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1.0.0</td>
                                    <td>135</td>
                                    <td>a year ago</td>
                                    <td>
                                        <span>
                                            Neque porro quisquam est qui dolorem
                                            ipsum quia dolor sit
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            type="link"
                                            href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=software`}
                                            className="btn btn--secondary md:inline-flex hidden text-white lemonsqueezy-button"
                                        >
                                            Download Now
                                        </Button>
                                        <Button
                                            type="link"
                                            href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=software`}
                                            className="btn md:hidden btn--secondary text-white lemonsqueezy-button"
                                        >
                                            ⬇
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1.0.0</td>
                                    <td>135</td>
                                    <td>a year ago</td>
                                    <td>
                                        <span>
                                            Neque porro quisquam est qui dolorem
                                            ipsum quia dolor sit
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            type="link"
                                            href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=software`}
                                            className="btn btn--secondary md:inline-flex hidden text-white lemonsqueezy-button"
                                        >
                                            Download Now
                                        </Button>
                                        <Button
                                            type="link"
                                            href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=software`}
                                            className="btn md:hidden btn--secondary text-white lemonsqueezy-button"
                                        >
                                            ⬇
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
