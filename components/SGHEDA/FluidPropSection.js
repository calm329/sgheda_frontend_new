import React, { useState } from "react";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";

const fluidsTableData = [
    {
        fluidType: "Water",
        freezingPoint: 0,
        viscosity: 0.001,
        density: 1001,
        specificHeat: 4162
    },
    {
        fluidType: "Methanol",
        freezingPoint: -96,
        viscosity: 0.0006,
        density: 782,
        specificHeat: 2530
    },
    {
        fluidType: "20% Ethylene Glycol",
        freezingPoint: -7.9,
        viscosity: 0.0015,
        density: 1030,
        specificHeat: 3951
    },
    {
        fluidType: "Propylene Glycol",
        freezingPoint: -8,
        viscosity: 0.0013,
        density: 1006,
        specificHeat: 4020
    },
    {
        fluidType: "20% Sodium Chloride",
        freezingPoint: -17.5,
        viscosity: 0.0025,
        density: 1160,
        specificHeat: 3400
    },
    {
        fluidType: "20% Calcium Chloride",
        freezingPoint: -20,
        viscosity: 0.003,
        density: 1190,
        specificHeat: 3100
    }
];

export const FluidPropSection = () => {
    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-4 gap-4">
                <Select
                    label="Fluid Type"
                    name="option"
                    options={[
                        { value: "option1", label: "Option 1" },
                        { value: "option2", label: "Option 2" }
                    ]}
                />
                <Input label="Viscosity" name="name" badge="Pa*s" />
                <Input label="Specific Heat" name="name" badge="J/(Kg*C)" />
                <Input
                    label="Density"
                    name="name"
                    badge={
                        <>
                            Kg/m<sup>3</sup>
                        </>
                    }
                />
            </div>
            <div>
                <div className="w-full my-4 text-center mx-auto text-white text-title">
                    Fluids Table: Viscosity, Densities and Specific Heats for
                    Various Liquids
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-white">
                            <th>Fluid Type</th>
                            <th className="text-center">
                                Freezing Point
                                <br />
                                (C)
                            </th>
                            <th className="text-center">
                                Viscosity
                                <br />
                                (Pa*s)
                            </th>
                            <th className="text-center">
                                Density
                                <br />
                                (Kg/m<sup>3</sup>)
                            </th>
                            <th className="text-center">
                                Specific Heat
                                <br />
                                (J/(degC*Kg))
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fluidsTableData.map((fluid) => (
                            <tr>
                                <td className="text-white">
                                    {fluid.fluidType}
                                </td>
                                <td className="text-white/80 text-center">
                                    {fluid.freezingPoint}
                                </td>
                                <td className="text-white/80 text-center">
                                    {fluid.viscosity}
                                </td>
                                <td className="text-white/80 text-center">
                                    {fluid.density}
                                </td>
                                <td className="text-white/80 text-center">
                                    {fluid.specificHeat}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full my-4 text-white/60 text-content">
                    <li>
                        1988. and Perry, RobertH. and Chilton, Cecil H. Chemical
                        Engineer's Handbook, 5thNew York, McGraw Hill
                        BookCompany, 1973.
                    </li>
                    <li>
                        If you would like to mixed liquids, you have to
                        determine properties of the liquid in advance.
                    </li>
                    <li>
                        Unit Conversion.
                        <br />
                        Viscosity: 1 Pa s = 1 kg/(m s) = 1 (N s)/m2 = 10 P =
                        1000 CP = 0.672197 Ib/(ft s) = 2419.08 Ib/(ft h) =
                        0.00014504 reyn <br />
                        Density: 1 lb/ft3 = 16.018463 kg/m3
                        <br />
                        Specific Heat: 1 Btu/(IbmoF) = 4, 186.8 J/(kg K) = 1
                        kcal/(kgoC) Temperature: T(degF) = T(degC) * 9/5 +
                    </li>
                </div>
            </div>
        </div>
    );
};
