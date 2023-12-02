import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";
import { Select } from "@components/Select";

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
                    <div className="w-full h-full grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex sm:flex-row flex-col gap-4">
                            <Input
                                type="number"
                                label="Heat Load"
                                readOnly
                                value={data?.inputData?.system?.heatLoad}
                                autoFocus
                                badge="W"
                            />
                            <Input
                                type="number"
                                label="Input Fluid Temperature"
                                badge="°C"
                                readOnly
                                value={
                                    data?.inputData?.system
                                        ?.inputFluidTemperature
                                }
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-white text-title">
                                Ring Type
                            </label>
                            <RadioButtonGroup
                                options={[
                                    {
                                        value: 0,
                                        label: "Horizontal Slinky"
                                    },
                                    { value: 1, label: "Vertical Slinky" },
                                    { value: 2, label: "Earth Basket" }
                                ]}
                                selectedValue={data?.inputData?.system?.type}
                                setValue={() => {}}
                                name={"ringType"}
                            />
                        </div>
                    </div>
                    <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Select
                                label="Fluid Type"
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
                                readOnly
                                value={data?.inputData?.fluid?.fluidType}
                            />
                            <Input
                                label="Viscosity"
                                type="number"
                                readOnly
                                value={data?.inputData?.fluid?.viscosity}
                                autoFocus
                                badge="Pa*s"
                            />
                            <Input
                                label="Specific Heat"
                                type="number"
                                readOnly
                                value={data?.inputData?.fluid?.specificHeat}
                                badge="J/(Kg*C)"
                            />
                            <Input
                                label="Density"
                                type="number"
                                readOnly
                                value={data?.inputData?.fluid?.density}
                                badge={
                                    <>
                                        Kg/m<sup>3</sup>
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Input
                                label="Thermal Conductivity"
                                type="number"
                                readOnly
                                value={
                                    data?.inputData?.soil?.thermalConductivity
                                }
                                autoFocus
                                badge="W/(m*K)"
                            />
                            <Input
                                label="Thermal Diffusivity"
                                type="number"
                                readOnly
                                value={
                                    data?.inputData?.soil?.thermalDiffusivity
                                }
                                badge={
                                    <>
                                        m<sup>2</sup>/h
                                    </>
                                }
                            />
                            <Input
                                label="Ground Temperature"
                                type="number"
                                readOnly
                                value={data?.inputData?.soil?.groundTemperature}
                                badge="C"
                            />
                        </div>
                    </div>
                    <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Input
                                label="Outer Diameter"
                                type="number"
                                readOnly
                                value={data?.inputData?.pipe?.outerDiameter}
                                badge="m"
                            />
                            <Input
                                label="Inner Diameter"
                                type="number"
                                readOnly
                                value={data?.inputData?.pipe?.innerDiameter}
                                badge="m"
                            />
                            <Input
                                label="Pipe Conductivity"
                                type="number"
                                readOnly
                                value={data?.inputData?.pipe?.pipeConductivity}
                                badge="W/(m*K)"
                            />
                            <Input
                                label="Buried Depth"
                                type="number"
                                readOnly
                                value={data?.inputData?.pipe?.buriedDepth}
                                badge="m"
                            />
                        </div>
                    </div>
                    <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Input
                                label="Required Power"
                                type="number"
                                readOnly
                                value={data?.inputData?.pump?.requiredPower}
                                badge="W"
                            />
                            <Input
                                label="Fluid Velocity"
                                type="number"
                                readOnly
                                value={data?.inputData?.pump?.fluidVelocity}
                                badge="m/s"
                            />
                            <Input
                                label="Pump Motor Efficiency"
                                type="number"
                                readOnly
                                value={
                                    data?.inputData?.pump?.pumpMotorEfficiency
                                }
                                badge="%"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Input
                                label="Ring Diameter"
                                readOnly
                                name="ringDiameter"
                                value={data?.outputData?.ringDiameter}
                                badge="m"
                            />
                            <Input
                                label="Pitch"
                                name="pitch"
                                value={data?.outputData?.pitch}
                                readOnly
                                badge="m"
                            />
                            <Input
                                label="Number of Ring"
                                readOnly
                                name="numberOfRing"
                                value={data?.outputData?.numberOfRing}
                                badge="n"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Input
                                label="Pipe Length"
                                readOnly
                                name="pipeLength"
                                value={data?.outputData?.pipeLength}
                                badge="m"
                            />
                            <Input
                                label="Inlet Temperature"
                                readOnly
                                name="inletTemperature"
                                value={data?.outputData?.inletTemperature}
                                badge="C"
                            />
                            <Input
                                label="System Flow Rate"
                                readOnly
                                name="systemFlowRate"
                                value={data?.outputData?.systemFlowRate}
                                badge="m/s"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};
