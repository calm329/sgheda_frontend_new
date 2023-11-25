import React, { useState } from "react";
import { Input } from "@components/Input";
import { useFormikContext } from "formik";

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

export const SoilPropSection = ({ footer }) => {
    const { getFieldProps, touched, errors } = useFormikContext();

    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                    label="Thermal Conductivity"
                    type="number"
                    placeholder="2.07"
                    {...getFieldProps("soil.thermalConductivity")}
                    error={
                        touched.soil?.thermalConductivity &&
                        errors.soil?.thermalConductivity
                    }
                    errorText={errors.soil?.thermalConductivity}
                    badge="W/(m*K)"
                />
                <Input
                    label="Thermal Diffusivity"
                    type="number"
                    placeholder="0.0000001"
                    {...getFieldProps("soil.thermalDiffusivity")}
                    error={
                        touched.soil?.thermalDiffusivity &&
                        errors.soil?.thermalDiffusivity
                    }
                    errorText={errors.soil?.thermalDiffusivity}
                    badge={
                        <>
                            m<sup>2</sup>/h
                        </>
                    }
                />
                <Input
                    label="Ground Temperature"
                    type="number"
                    placeholder="20"
                    {...getFieldProps("soil.groundTemperature")}
                    error={
                        touched.soil?.groundTemperature &&
                        errors.soil?.groundTemperature
                    }
                    errorText={errors.soil?.groundTemperature}
                    badge="C"
                />
            </div>
            {footer("")}
            <div>
                <div className="w-full my-4 text-center mx-auto text-white text-title font-bold">
                    Soil Table : Thermal Conductivity and Diffusivity of Sand
                    and Clay Soils
                </div>
                <div className="w-full overflow-hidden overflow-x-auto">
                    <table className="w-full whitespace-nowrap bg-[#111A32] rounded-xl">
                        <thead className="border-t-0">
                            <tr className="text-white border-b border-gray-500">
                                <th></th>
                                <th className="text-center"></th>
                                <th
                                    className="text-center border-l border-gray-500"
                                    colSpan={2}
                                >
                                    5% Moist
                                </th>
                                <th
                                    className="text-center border-l border-gray-500"
                                    colSpan={2}
                                >
                                    10% Moist
                                </th>
                                <th
                                    className="text-center border-l border-gray-500"
                                    colSpan={2}
                                >
                                    15% Moist
                                </th>
                                <th
                                    className="text-center border-l border-gray-500"
                                    colSpan={2}
                                >
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
                                <th className="text-center border-l border-gray-500">
                                    K
                                    <br />
                                    W/(m*K)
                                </th>
                                <th className="text-center">
                                    a 1e-6
                                    <br />m<sup>2</sup>/s
                                </th>
                                <th className="text-center border-l border-gray-500">
                                    K
                                    <br />
                                    W/(m*K)
                                </th>
                                <th className="text-center">
                                    a 1e-6
                                    <br />m<sup>2</sup>/s
                                </th>
                                <th className="text-center border-l border-gray-500">
                                    K
                                    <br />
                                    W/(m*K)
                                </th>
                                <th className="text-center">
                                    a 1e-6
                                    <br />m<sup>2</sup>/s
                                </th>
                                <th className="text-center border-l border-gray-500">
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
                                    <tr
                                        key={index + "-" + subIndex}
                                        className={`${
                                            index === 0 && subIndex === 2
                                                ? ""
                                                : "border-b-0"
                                        }`}
                                    >
                                        {subIndex === 0 && (
                                            <td
                                                rowSpan={3}
                                                className="text-white"
                                            >
                                                {soil.name}
                                            </td>
                                        )}
                                        <td className="text-center text-white/80">
                                            {data.freezingPoint}
                                        </td>
                                        <td className="text-center text-white/80 border-l border-gray-500">
                                            {data.value[0][0]}
                                        </td>
                                        <td className="text-center text-white/80">
                                            {data.value[0][1]}
                                        </td>
                                        <td className="text-center text-white/80  border-l border-gray-500">
                                            {data.value[1][0]}
                                        </td>
                                        <td className="text-center text-white/80">
                                            {data.value[1][1]}
                                        </td>
                                        <td className="text-center text-white/80  border-l border-gray-500">
                                            {data.value[2][0]}
                                        </td>
                                        <td className="text-center text-white/80">
                                            {data.value[2][1]}
                                        </td>
                                        <td className="text-center text-white/80  border-l border-gray-500">
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
                </div>
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
