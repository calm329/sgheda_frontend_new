import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { useFormikContext } from "formik";

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

export const FluidPropSection = ({ footer }) => {
    const { getFieldProps, touched, errors } = useFormikContext();

    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                    label="Fluid Type"
                    {...getFieldProps("fluid.fluidType")}
                    options={[
                        { value: "Water", label: "Water" },
                        { value: "Methanol", label: "Methanol" },
                        {
                            value: "20% Ethylene Glycol",
                            label: "20% Ethylene Glycol"
                        },
                        {
                            value: "Propylene Glycol",
                            label: "Propylene Glycol"
                        },
                        {
                            value: "20% Sodium Chloride",
                            label: "20% Sodium Chloride"
                        },
                        {
                            value: "20% Calcium Chloride",
                            label: "20% Calcium Chloride"
                        }
                    ]}
                />
                <Input
                    label="Viscosity"
                    type="number"
                    placeholder="0.001"
                    autoFocus
                    {...getFieldProps("fluid.viscosity")}
                    badge="Pa*s"
                    error={touched.fluid?.viscosity && errors.fluid?.viscosity}
                    errorText={errors.fluid?.viscosity}
                />
                <Input
                    label="Specific Heat"
                    type="number"
                    placeholder="4162"
                    {...getFieldProps("fluid.specificHeat")}
                    badge="J/(Kg*C)"
                    error={
                        touched.fluid?.specificHeat &&
                        errors.fluid?.specificHeat
                    }
                    errorText={errors.fluid?.specificHeat}
                />
                <Input
                    label="Density"
                    type="number"
                    placeholder="1001"
                    {...getFieldProps("fluid.density")}
                    badge={
                        <>
                            Kg/m<sup>3</sup>
                        </>
                    }
                    error={touched.fluid?.density && errors.fluid?.density}
                    errorText={errors.fluid?.density}
                />
            </div>
            {footer("")}
            <div>
                <div className="w-full my-4 text-center mx-auto text-white text-title font-bold">
                    Fluids Table: Viscosity, Densities and Specific Heats for
                    Various Liquids
                </div>
                <div className="overflow-hidden overflow-x-auto">
                    <table className="w-full whitespace-nowrap bg-[#111A32] rounded-xl">
                        <thead className="border-t-0">
                            <tr className="text-white">
                                <th className="pl-2">Fluid Type</th>
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
                                <th className="text-center pr-2">
                                    Specific Heat
                                    <br />
                                    (J/(degC*Kg))
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {fluidsTableData.map((fluid, index) => (
                                <tr className="border-none" key={index}>
                                    <td className="text-white pl-2">
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
                                    <td className="text-white/80 text-center pr-2">
                                        {fluid.specificHeat}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full my-4 text-white/60 text-content">
                    <li>
                        1988. and Perry, RobertH. and Chilton, Cecil H. Chemical
                        Engineer&apos;s Handbook, 5thNew York, McGraw Hill
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
