import { Button } from "@components/Button";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
    {
        name: "Roam Load Calculator",
        credits: 30,
        description:
            "Optimize your Roam experience with our Roam Load Calculator. Streamline your load management effortlessly, ensuring efficient usage tailored to your needs.",
        link: "/calculator/rlc"
    },
    {
        name: "SGHEDA",
        credits: 50,
        description:
            "Enhance geothermal efficiency with our Slinky Ground Heat Exchanger tool, optimizing heat exchange through innovative coil designs for sustainable heating and cooling.",
        link: "/calculator/sgheda"
    },
    {
        name: "EAHED",
        credits: 70,
        description:
            "Enhance geothermal efficiency with our Slinky Ground Heat Exchanger tool, optimizing heat exchange through innovative coil designs for sustainable heating and cooling.",
        link: "/calculator/eahed"
    },
    {
        name: "Interior Finish Selection",
        credits: 70,
        description:
            "Simplify your design journey with our Interior Finish Selection service. Explore curated options to effortlessly elevate your space, ensuring a harmonious blend of style and functionality.",
        link: "/calculator/ifs"
    }
];

export const CalculatorBodySection = (props) => {
    const itemsPerPage = 5;
    const [historyData, setHistoryData] = useState([]);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            const res = await axios.get(
                `/api/calculator/history?page=1&limit=${itemsPerPage + 1}`
            );
            setHasMore(res.data.length > itemsPerPage);
            setHistoryData([...res.data.slice(0, itemsPerPage)]);
        };
        fetchInitialData();
    }, []);

    const getHistory = async () => {
        const res = await axios.get(
            `/api/calculator/history?page=${page}&limit=${itemsPerPage + 1}`
        );
        setHasMore(res.data.length > itemsPerPage);
        setHistoryData((prevData) => [
            ...prevData,
            ...res.data.slice(0, itemsPerPage)
        ]);
        setPage(page + 1);
    };

    const downloadHistory = async () => {
        const res = await axios.get(`/api/calculator/history/download`);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "history.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <SectionContainer
            id={"sgheda"}
            className="page-banner--container p-4 pb-0"
        >
            <SectionContainer className="page-banner--inner-container w-full h-full z-10 flex lg:flex-row flex-col rounded-lg gap-4 bg-[url('/images/background/calculator.jpg')] bg-center bg-cover no-repeat">
                <SectionContainer className="w-full h-full flex gap-12 bg-[#09112D]/80 justify-center flex-col rounded-lg p-12 md:px-12 px-4">
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="my-2 text-orange-400 text-content text-md">
                                    Calculator
                                </div>
                                <div className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    What do you want to calculate?
                                </div>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                                <div className="text-content text-gray-300 text-center text-lg">
                                    Our design tool is your gateway to
                                    creativity and innovation. Whether
                                    you&apos;re a seasoned professional or a
                                    beginner, our intuitive platform simplifies
                                    the design process, making it accessible to
                                    all. Here&apos;s how it works:
                                </div>
                            </div>
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full grid xl:grid-cols-4 grid-cols-1 lg:grid-cols-2 grid-flow-row gap-12">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.link}
                                    className="rounded-lg flex flex-col bg-white/10 p-8 gap-4 select-none cursor-pointer transition-all hover:bg-[#F98222]/40 hover:scale-105"
                                >
                                    <div className="flex justify-between items-end gap-2">
                                        <Image
                                            src="/images/calculator/calculator.svg"
                                            width={40}
                                            height={40}
                                            alt="performance analysis"
                                            loading="lazy"
                                            className="p-2 bg-[#F98222]/40 rounded-xl"
                                        />
                                        <div className="text-white/50">
                                            <span className="text-xl text-title font-bold">
                                                {link.credits}
                                            </span>{" "}
                                            <span className="text-sm text-content">
                                                Credits
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-content text-white text-lg font-bold">
                                        {link.name}
                                    </div>
                                    <div className="text-content text-gray-300 text-md">
                                        {link.description}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </MotionBTTContainer>
                    <MotionBTTContainer
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="w-full">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-title text-3xl text-white md:text-left text-center uppercase font-bold">
                                    HISTORY
                                </div>
                                <div className="h-1 w-16 mb-2 bg-orange-400"></div>
                            </div>
                            <div className="w-full overflow-hidden overflow-x-auto">
                                <table className="w-full whitespace-nowrap">
                                    <thead className="text-title text-white text-left">
                                        <tr>
                                            <th>Calculation</th>
                                            <th>Credits</th>
                                            <th>Date</th>
                                            <th>See Calculations</th>
                                            <th>Design Result</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-content text-gray-300">
                                        {historyData.map((history) => (
                                            <tr key={history.id}>
                                                <td>{history.type}</td>
                                                <td>{history.amount}</td>
                                                <td>{history.date}</td>
                                                <td>View</td>
                                                <td>
                                                    <a
                                                        href={`api/calculator/history/${history.id}`}
                                                        download={`${history.id}.json`}
                                                        className="text-orange-400 underline font-bold text-content"
                                                    >
                                                        Download Now
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {historyData.length === 0 && (
                                <div className="w-full flex justify-center items-center p-4 bg-white/10 text-white rounded-lg my-2 text-content">
                                    There is no history
                                </div>
                            )}
                            <div className="w-full flex justify-center items-center">
                                <Button
                                    type="button"
                                    href={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/download?type=software`}
                                    className={`btn btn--secondary mx-auto my-4 text-white lemonsqueezy-button ${
                                        hasMore ? "" : "hidden"
                                    }`}
                                    onClick={getHistory}
                                >
                                    See more
                                </Button>
                            </div>
                        </div>
                    </MotionBTTContainer>
                </SectionContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
