import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";
import { useFormikContext } from "formik";
import { MaterialSelect } from "@components/MaterialSelect";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const GroundFloorSection = ({ footer }) => {
    const { getFieldProps, setFieldValue, values, touched, errors } =
        useFormikContext();
    const [numberOfMaterials, setNumberOfMaterials] = useState(1);

    const handleChange = (selectedOption) => {
        console.log(`Option selected:`, selectedOption);
    };

    const addMaterial = () => {
        values.groundFloor.materials.push({
            thermalConductivity: 0,
            thickness: 0
        });

        setNumberOfMaterials(numberOfMaterials + 1);
    };

    const removeMaterial = (index) => {
        values.groundFloor.materials.splice(index, 1);
        setNumberOfMaterials(numberOfMaterials - 1);
    };

    return (
        <div className="w-full h-full gap-8 my-8">
            <Input
                type="number"
                label="Area"
                placeholder="64000"
                className="max-w-[300px]"
                autoFocus
                badge={
                    <>
                        m<sup>2</sup>
                    </>
                }
                {...getFieldProps(`groundFloor.area`)}
                error={touched.groundFloor?.area && errors.groundFloor?.area}
                errorText={errors.groundFloor?.area}
            />
            {values.groundFloor.materials.map((material, index) => {
                return (
                    <div
                        key={index}
                        className="flex sm:flex-row flex-col gap-4"
                    >
                        <MaterialSelect
                            label="Material"
                            name="material"
                            className="w-full my-1 col-span-2 sm:col-span-1"
                            handleChange={(e) => {
                                setFieldValue(
                                    `groundFloor.materials[${index}].thermalConductivity`,
                                    e.value
                                );
                                setFieldValue(
                                    `groundFloor.materials[${index}].material`,
                                    e.label
                                );
                            }}
                        />
                        <Input
                            type="number"
                            label="Thermal Conductivity"
                            placeholder="64000"
                            readOnly
                            badge="W/m*K"
                            {...getFieldProps(
                                `groundFloor.materials[${index}].thermalConductivity`
                            )}
                            error={
                                touched.groundFloor?.materials &&
                                touched.groundFloor?.materials[index]
                                    ?.thermalConductivity &&
                                errors.groundFloor?.materials &&
                                errors.groundFloor?.materials[index]
                                    ?.thermalConductivity
                            }
                            errorText={
                                errors.groundFloor?.materials &&
                                errors.groundFloor?.materials[index]
                                    ?.thermalConductivity
                            }
                        />
                        <div className="flex w-full">
                            <Input
                                type="number"
                                label="Thickness"
                                badge="m"
                                placeholder="54"
                                {...getFieldProps(
                                    `groundFloor.materials[${index}].thickness`
                                )}
                                error={
                                    touched.groundFloor?.materials &&
                                    touched.groundFloor?.materials[index]
                                        ?.thickness &&
                                    errors.groundFloor?.materials &&
                                    errors.groundFloor?.materials[index]
                                        ?.thickness
                                }
                                errorText={
                                    errors.groundFloor?.materials &&
                                    errors.groundFloor?.materials[index]
                                        ?.thickness
                                }
                            />
                            <div className="flex gap-2 md:hidden ml-2">
                                {(index > 0 || numberOfMaterials > 1) && (
                                    <div
                                        className="h-12 mt-[24px] flex justify-center items-center cursor-pointer hover:opacity-75 active:opacity-90 transition-all duration-300"
                                        onClick={() => removeMaterial(index)}
                                    >
                                        <Icon
                                            icon="pajamas:remove"
                                            className="min-w-[24px] min-h-[24px] my-auto text-red-500"
                                        />
                                    </div>
                                )}
                                {index ===
                                    values.groundFloor.materials.length - 1 && (
                                    <div
                                        className="h-12 mt-[24px] flex justify-center items-center cursor-pointer hover:opacity-75 active:opacity-90 transition-all duration-300"
                                        onClick={addMaterial}
                                    >
                                        <Icon
                                            icon="zondicons:add-outline"
                                            className="min-w-[24px] min-h-[24px] my-auto text-orange-400"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:flex gap-2 hidden">
                            {(index > 0 || numberOfMaterials > 1) && (
                                <div
                                    className="h-12 mt-[24px] flex justify-center items-center cursor-pointer hover:opacity-75 active:opacity-90 transition-all duration-300"
                                    onClick={() => removeMaterial(index)}
                                >
                                    <Icon
                                        icon="pajamas:remove"
                                        className="min-w-[24px] min-h-[24px] my-auto text-red-500"
                                    />
                                </div>
                            )}
                            {index ===
                                values.groundFloor.materials.length - 1 && (
                                <div
                                    className="h-12 mt-[24px] flex justify-center items-center cursor-pointer hover:opacity-75 active:opacity-90 transition-all duration-300"
                                    onClick={addMaterial}
                                >
                                    <Icon
                                        icon="zondicons:add-outline"
                                        className="min-w-[24px] min-h-[24px] my-auto text-orange-400"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
            {footer("md:col-span-1 lg:col-span-2")}
        </div>
    );
};
