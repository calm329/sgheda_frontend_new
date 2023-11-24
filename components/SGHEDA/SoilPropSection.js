import React, { useState } from "react";
import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";

const soilTableData = [
    {
        name: "Coarse 100% Sand",
        data: [
            {
                freezingPoint: 0,
                value: [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0]
                ]
            },
            {
                freezingPoint: -96,
                value: [
                    [-96, -96],
                    [-96, -96],
                    [-96, -96],
                    [-96, -96]
                ]
            },
            {
                freezingPoint: -7.9,
                value: [
                    [-7.9, -7.9],
                    [-7.9, -7.9],
                    [-7.9, -7.9],
                    [-7.9, -7.9]
                ]
            }
        ]
    },
    {
        name: "Fine Grain 100% Clay",
        data: [
            {
                freezingPoint: -8,
                value: [
                    [-8, -8],
                    [-8, -8],
                    [-8, -8],
                    [-8, -8]
                ]
            },
            {
                freezingPoint: -17.5,
                value: [
                    [-17.5, -17.5],
                    [-17.5, -17.5],
                    [-17.5, -17.5],
                    [-17.5, -17.5]
                ]
            },
            {
                freezingPoint: -20,
                value: [
                    [-20, -20],
                    [-20, -20],
                    [-20, -20],
                    [-20, -20]
                ]
            }
        ]
    }
];

export const SoilPropSection = () => {
    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-3 gap-4">
                <Input
                    label="Thermal Conductivity"
                    name="name"
                    badge="W/(m*K)"
                />
                <Input
                    label="Thermal Diffusivity"
                    name="name"
                    badge={
                        <>
                            m<sup>2</sup>/h
                        </>
                    }
                />
                <Input label="Ground Temperature" name="name" badge="C" />
            </div>
            <div>
                <div className="w-full my-4 text-center mx-auto text-white text-title">
                    Soil Table : Thermal Conductivity and Diffusivity of Sand
                    and Clay Soils
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-white">
                            <th></th>
                            <th className="text-center"></th>
                            <th className="text-center" colSpan={2}>
                                5% Moist
                            </th>
                            <th className="text-center" colSpan={2}>
                                10% Moist
                            </th>
                            <th className="text-center" colSpan={2}>
                                15% Moist
                            </th>
                            <th className="text-center" colSpan={2}>
                                20% Moist
                            </th>
                        </tr>
                        <tr className="text-white">
                            <th>Soil Type</th>
                            <th className="text-center">
                                Freezing Point
                                <br />
                                (C)
                            </th>
                            <th className="text-center">
                                K
                                <br />
                                W/(m*K)
                            </th>
                            <th className="text-center">
                                a 1e-6
                                <br />m<sup>2</sup>/s
                            </th>
                            <th className="text-center">
                                K
                                <br />
                                W/(m*K)
                            </th>
                            <th className="text-center">
                                a 1e-6
                                <br />m<sup>2</sup>/s
                            </th>
                            <th className="text-center">
                                K
                                <br />
                                W/(m*K)
                            </th>
                            <th className="text-center">
                                a 1e-6
                                <br />m<sup>2</sup>/s
                            </th>
                            <th className="text-center">
                                K
                                <br />
                                W/(m*K)
                            </th>
                            <th className="text-center">
                                a 1e-6
                                <br />m<sup>2</sup>/s
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {soilTableData.map((soil, index) =>
                            soil.data.map((data, subIndex) => (
                                <tr key={index + "-" + subIndex}>
                                    {subIndex === 0 && (
                                        <td rowSpan={3} className="text-white">
                                            {soil.name}
                                        </td>
                                    )}
                                    <td className="text-center text-white/80">
                                        {data.freezingPoint}
                                    </td>
                                    <td className="text-center text-white/80">
                                        {data.value[0][0]}
                                    </td>
                                    <td className="text-center text-white/80">
                                        {data.value[0][1]}
                                    </td>
                                    <td className="text-center text-white/80">
                                        {data.value[1][0]}
                                    </td>
                                    <td className="text-center text-white/80">
                                        {data.value[1][1]}
                                    </td>
                                    <td className="text-center text-white/80">
                                        {data.value[2][0]}
                                    </td>
                                    <td className="text-center text-white/80">
                                        {data.value[2][1]}
                                    </td>
                                    <td className="text-center text-white/80">
                                        {data.value[3][0]}
                                    </td>
                                    <td className="text-center text-white/80">
                                        {data.value[3][1]}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="w-full my-4 text-white/60 text-content">
                    <li>
                        O.T. Farouki, "Evaluation of Methods for Calculating
                        Soil Thermal Conductivity," U.S. Army Cold Regions
                        Research and Engineering Laboratory Report 82-8,
                        Hanover, NH, 1982.
                    </li>
                </div>
            </div>
        </div>
    );
};
