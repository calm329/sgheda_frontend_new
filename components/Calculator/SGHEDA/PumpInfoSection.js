import React, { useState } from "react";
import { Input } from "@components/Input";
import { useFormikContext } from "formik";

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

export const PumpInfoSection = ({ footer }) => {
    const { getFieldProps, touched, errors } = useFormikContext();

    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                    label="Required Power"
                    type="number"
                    placeholder="600"
                    {...getFieldProps("pump.requiredPower")}
                    error={
                        touched.pump?.requiredPower &&
                        errors.pump?.requiredPower
                    }
                    errorText={errors.pump?.requiredPower}
                    badge="W"
                />
                <Input
                    label="Fluid Velocity"
                    type="number"
                    placeholder="1.5"
                    {...getFieldProps("pump.fluidVelocity")}
                    error={
                        touched.pump?.fluidVelocity &&
                        errors.pump?.fluidVelocity
                    }
                    errorText={errors.pump?.fluidVelocity}
                    badge="m/s"
                />
                <Input
                    label="Pump Motor Efficiency"
                    type="number"
                    placeholder="85"
                    {...getFieldProps("pump.pumpMotorEfficiency")}
                    error={
                        touched.pump?.pumpMotorEfficiency &&
                        errors.pump?.pumpMotorEfficiency
                    }
                    errorText={errors.pump?.pumpMotorEfficiency}
                    badge="%"
                />
            </div>
            {footer("")}
            <div>
                <div className="w-full my-4 text-center mx-auto text-white text-title">
                    DC Submersible Solar Pump Cost Table : Brand, Performance
                    and Cost
                </div>
                <div className="overflow-hidden overflow-x-auto">
                    <table className="w-full whitespace-nowrap bg-[#111A32] rounded-xl">
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
                            {pumpInfoTableData.map((info, index) => (
                                <tr key={index}>
                                    <td className="text-white">
                                        {info.fluidType}
                                    </td>
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
                </div>
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
