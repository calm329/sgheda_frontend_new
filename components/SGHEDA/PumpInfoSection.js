import React, { useState } from "react";
import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";

const pumpInfoTableData = [
    {
        fluidType: "LIANDU-US",
        model: "SP 1588",
        power: 0.67,
        lift: 50,
        flowRate: 1703,
        price: 320
    },
    {
        fluidType: "Growatt",
        model: "SP 1588",
        power: 1.5,
        lift: 30,
        flowRate: 800,
        price: 800
    },
    {
        fluidType: "Solaqua",
        model: "SS 2088",
        power: 2,
        lift: 50,
        flowRate: 1000,
        price: 1200
    },
    {
        fluidType: "Astral",
        model: "AS 3088",
        power: 3,
        lift: 70,
        flowRate: 1703,
        price: 1500
    },
    {
        fluidType: "Greenmax",
        model: "GM 4088",
        power: 4,
        lift: 100,
        flowRate: 2000,
        price: 2000
    },
    {
        fluidType: "HYDROTECH",
        model: "HT 5088",
        power: 5,
        lift: 150,
        flowRate: 3000,
        price: 2500
    }
];

export const PumpInfoSection = () => {
    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-3 gap-4">
                <Input label="Required Power" name="name" badge="W" />
                <Input label="Fluid Velocity" name="name" badge="m/s" />
                <Input label="Pump Motor Efficiency" name="name" badge="%" />
            </div>
            <div>
                <div className="w-full my-4 text-center mx-auto text-white text-title">
                    DC Submersible Solar Pump Cost Table : Brand, Performance
                    and Cost
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-white">
                            <th>Fluid Type</th>
                            <th className="text-center">Model</th>
                            <th className="text-center">
                                Power
                                <br />
                                (HP)
                            </th>
                            <th className="text-center">
                                Lift
                                <br />
                                (m)
                            </th>
                            <th className="text-center">
                                Flow Rate
                                <br />
                                (L/h)
                            </th>
                            <th className="text-center">
                                Price
                                <br />
                                (USD)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pumpInfoTableData.map((info) => (
                            <tr>
                                <td className="text-white">{info.fluidType}</td>
                                <td className="text-white/80 text-center">
                                    {info.model}
                                </td>
                                <td className="text-white/80 text-center">
                                    {info.power}
                                </td>
                                <td className="text-white/80 text-center">
                                    {info.lift}
                                </td>
                                <td className="text-white/80 text-center">
                                    {info.flowRate}
                                </td>
                                <td className="text-white/80 text-center">
                                    {info.price}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full my-4 text-white/60 text-content">
                    <li>
                        As you can see, the prices of DC submersible solar pumps
                        can vary significantly. It is important to do your
                        research to find the best pump for your need. This
                        information is updated at 2023.
                    </li>
                </div>
            </div>
        </div>
    );
};
