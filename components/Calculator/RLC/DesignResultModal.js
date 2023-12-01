import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";
import { Select } from "@components/Select";
import { MaterialSelect } from "@components/MaterialSelect";
import { WindowSelect } from "@components/WindowSelect";

export const DesignResultModal = ({ data, visible, onHide }) => {
    console.log(data);
    return (
        <Dialog
            header={false}
            visible={visible}
            onHide={onHide}
            className="w-[90%] dark-modal-view"
            draggable={true}
            resizable={false}
        >
            <div className="w-full">
                <div className="w-full bg-[#09112D] rounded-xl p-4 my-2">
                    <label className="mb-1 text-white text-lg font-semibold text-content">
                        Input Values
                    </label>
                    <div className="w-full h-[2px] bg-white/30 my-4 rounded-xl"></div>
                    <div className="w-full h-full gap-8 my-8">
                        <label className="mb-1 text-white text-md font-semibold text-content">
                            External Walls
                        </label>
                        <div className="w-full p-4 border-[1px] border-white/30 rounded-xl">
                            <Input
                                type="number"
                                label="Area"
                                placeholder="64000"
                                className="max-w-[300px]"
                                readOnly
                                value={data?.inputData?.externalWalls?.area}
                                badge={
                                    <>
                                        m<sup>2</sup>
                                    </>
                                }
                            />
                            {data?.inputData?.externalWalls?.materials?.map(
                                (material, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex sm:flex-row flex-col gap-4"
                                        >
                                            <MaterialSelect
                                                label="Material"
                                                name="material"
                                                disabled={true}
                                                value={material.material}
                                                className="w-full my-1 col-span-2 sm:col-span-1"
                                            />
                                            <Input
                                                type="number"
                                                label="Thermal Conductivity"
                                                placeholder="64000"
                                                value={
                                                    material.thermalConductivity
                                                }
                                                readOnly
                                                badge="W/m*K"
                                            />
                                            <div className="flex w-full">
                                                <Input
                                                    type="number"
                                                    label="Thickness"
                                                    value={material.thickness}
                                                    badge="m"
                                                    placeholder="54"
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div className="w-full h-full gap-8 my-8">
                        <label className="mb-1 text-white text-md font-semibold text-content">
                            Ground Floor
                        </label>
                        <div className="w-full p-4 border-[1px] border-white/30 rounded-xl">
                            <Input
                                type="number"
                                label="Area"
                                placeholder="64000"
                                className="max-w-[300px]"
                                readOnly
                                value={data?.inputData?.groundFloor?.area}
                                badge={
                                    <>
                                        m<sup>2</sup>
                                    </>
                                }
                            />
                            {data?.inputData?.groundFloor?.materials?.map(
                                (material, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex sm:flex-row flex-col gap-4"
                                        >
                                            <MaterialSelect
                                                label="Material"
                                                name="material"
                                                disabled={true}
                                                value={material.material}
                                                className="w-full my-1 col-span-2 sm:col-span-1"
                                            />
                                            <Input
                                                type="number"
                                                label="Thermal Conductivity"
                                                placeholder="64000"
                                                value={
                                                    material.thermalConductivity
                                                }
                                                readOnly
                                                badge="W/m*K"
                                            />
                                            <div className="flex w-full">
                                                <Input
                                                    type="number"
                                                    label="Thickness"
                                                    value={material.thickness}
                                                    badge="m"
                                                    placeholder="54"
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div className="w-full h-full gap-8 my-8">
                        <label className="mb-1 text-white text-md font-semibold text-content">
                            Roof
                        </label>
                        <div className="w-full p-4 border-[1px] border-white/30 rounded-xl">
                            <Input
                                type="number"
                                label="Area"
                                placeholder="64000"
                                className="max-w-[300px]"
                                readOnly
                                value={data?.inputData?.roof?.area}
                                badge={
                                    <>
                                        m<sup>2</sup>
                                    </>
                                }
                            />
                            {data?.inputData?.roof?.materials?.map(
                                (material, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex sm:flex-row flex-col gap-4"
                                        >
                                            <MaterialSelect
                                                label="Material"
                                                name="material"
                                                disabled={true}
                                                value={material.material}
                                                className="w-full my-1 col-span-2 sm:col-span-1"
                                            />
                                            <Input
                                                type="number"
                                                label="Thermal Conductivity"
                                                placeholder="64000"
                                                value={
                                                    material.thermalConductivity
                                                }
                                                readOnly
                                                badge="W/m*K"
                                            />
                                            <div className="flex w-full">
                                                <Input
                                                    type="number"
                                                    label="Thickness"
                                                    value={material.thickness}
                                                    badge="m"
                                                    placeholder="54"
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full h-full gap-8 my-8">
                    <div className="flex sm:flex-row flex-col gap-4">
                        <WindowSelect
                            label="Window"
                            name="material"
                            disabled={true}
                            value={data?.inputData?.windows?.window}
                            className="w-full my-1 col-span-2 sm:col-span-1"
                        />
                        <Input
                            type="number"
                            label="R-value"
                            readOnly
                            placeholder="64000"
                            value={data?.inputData?.windows?.rValue}
                            badge={
                                <>
                                    m<sup>2</sup>*K/W
                                </>
                            }
                        />
                        <Input
                            type="number"
                            label="Area"
                            readOnly
                            value={data?.inputData?.windows?.area}
                            badge={
                                <>
                                    m<sup>2</sup>
                                </>
                            }
                            placeholder="54"
                        />
                    </div>
                    <div className="w-full h-full gap-8 my-8">
                        <div className="flex sm:flex-row flex-col gap-4">
                            <Input
                                type="number"
                                label="Inner Temperature"
                                placeholder="64000"
                                readOnly
                                value={data?.inputData?.temp?.innerTemp}
                                badge="°C"
                            />
                            <Input
                                type="number"
                                label="Outer Temperature"
                                badge="°C"
                                readOnly
                                value={data?.inputData?.temp?.outerTemp}
                                placeholder="54"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full bg-[#09112D] rounded-xl p-4 my-2">
                    <label className="mb-1 text-white text-lg font-semibold text-content">
                        Design Result
                    </label>
                    <div className="w-full h-[2px] bg-white/30 my-4 rounded-xl"></div>
                    <div className="w-full h-full grid grid-cols-1 gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Input
                                label="Heat Load"
                                name="heatLoad"
                                readOnly
                                value={data?.outputData}
                                badge="m"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};
