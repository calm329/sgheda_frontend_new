import React, { useState } from "react";
import { Input } from "@components/Input";
import { useFormikContext } from "formik";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const AnalysisSection = ({ footer, data }) => {
    const {
        elapsedTime,
        tSeries,
        gsSeries,
        tpSeries0,
        tpSeries05,
        tpSeries1,
        tpSeries2,
        tpSeries4
    } = data;

    const gf_options = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: "G-function"
            }
        },
        scales: {
            y: {
                type: "linear",
                display: true,
                position: "left"
            }
        }
    };

    const tp_options = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: "Temperature pertubatio"
            }
        },
        scales: {
            y: {
                type: "linear",
                display: true,
                position: "left"
            },
            y1: {
                type: "linear",
                display: false,
                position: "left",
                grid: {
                    drawOnChartArea: false
                }
            },
            y2: {
                type: "linear",
                display: false,
                position: "left",
                grid: {
                    drawOnChartArea: false
                }
            },
            y3: {
                type: "linear",
                display: false,
                position: "left",
                grid: {
                    drawOnChartArea: false
                }
            },
            y4: {
                type: "linear",
                display: false,
                position: "left",
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };

    const gf_data = {
        labels: tSeries.map((t) => t.toFixed(2)),
        datasets: [
            {
                label: "0.01m",
                data: gsSeries,
                borderColor: "rgba(123,45,67,1)",
                backgroundColor: "rgba(123,45,67,0.6)",
                yAxisID: "y"
            }
        ]
    };

    const tp_data = {
        labels: tSeries.map((t) => t.toFixed(2)),
        datasets: [
            {
                label: "0.01m",
                data: tpSeries0,
                borderColor: "rgba(123,45,67,1)",
                backgroundColor: "rgba(123,45,67,0.6)",
                yAxisID: "y"
            },
            {
                label: "0.5m",
                data: tpSeries05,
                borderColor: "rgba(98,210,54,1)",
                backgroundColor: "rgba(98,210,54,0.6)",
                yAxisID: "y1"
            },
            {
                label: "1m",
                data: tpSeries1,
                borderColor: "rgba(23,200,134,0.6)",
                backgroundColor: "rgba(23,200,134,0.6)",
                yAxisID: "y2"
            },
            {
                label: "2m",
                data: tpSeries2,
                borderColor: "rgba(189,67,205,1)",
                backgroundColor: "rgba(189,67,205,0.6)",
                yAxisID: "y3"
            },
            {
                label: "4m",
                data: tpSeries4,
                borderColor: "rgba(45,134,210,1)",
                backgroundColor: "rgba(45,134,210,0.6)",
                yAxisID: "y4"
            }
        ]
    };
    // const data = [
    //     [0, 20],
    //     [-30, 40],
    //     [-88.9, 9]
    // ]; // LineGraph reads these as x,y pairs
    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <Line options={gf_options} data={gf_data} />
            <Line options={tp_options} data={tp_data} />
            {footer("")}
        </div>
    );
};
