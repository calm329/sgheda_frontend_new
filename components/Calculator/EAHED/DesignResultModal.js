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
                    <div className="w-full h-full flex flex-col gap-8 my-8">
                        <div className="flex gap-4 flex-col sm:flex-row sm:items-center">
                            <label className="mb-1 text-white text-title">
                                Loop Type
                            </label>
                            <RadioButtonGroup
                                options={[
                                    { value: 0, label: "Open Loop" },
                                    { value: 1, label: "Closed Loop" }
                                ]}
                                selectedValue={data?.inputData?.loopType}
                                setValue={(value) => {}}
                            />
                        </div>
                        <div
                            className={`grid ${
                                data?.inputData?.loopType === 0
                                    ? "lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
                                    : "lg:grid-cols-4 md:grid-cols-2 grid-cols-1"
                            } gap-4`}
                        >
                            <Input
                                type="number"
                                label="Heat Load"
                                placeholder="300"
                                readOnly
                                value={data?.inputData?.heatLoad}
                                badge="W"
                                step={0.01}
                            />
                            <Input
                                type="number"
                                label="Ground Temp"
                                readOnly
                                value={data?.inputData?.groundTemp}
                                badge="°C"
                                step={0.01}
                            />
                            <Input
                                type="number"
                                label="Room Temp"
                                readOnly
                                value={data?.inputData?.roomTemp}
                                badge="°C"
                                step={0.01}
                            />
                            {data?.inputData?.loopType === 0 && (
                                <Input
                                    type="number"
                                    label="Outside Temp"
                                    readOnly
                                    value={data?.inputData?.outsideTemp}
                                    badge="°C"
                                    step={0.01}
                                />
                            )}
                            <Input
                                type="number"
                                label="Pipe Inner Diameter"
                                readOnly
                                value={data?.inputData?.pipeInnerDiameter}
                                badge="m"
                                step={0.01}
                            />
                            <Input
                                type="number"
                                label="Pipe Outer Diameter"
                                readOnly
                                value={data?.inputData?.pipeOuterDiameter}
                                badge="m"
                                step={0.01}
                            />
                            <Select
                                label="Pipe Material"
                                options={[
                                    { value: "Clay", label: "Clay" },
                                    { value: "PEX", label: "PEX" },
                                    { value: "Steel", label: "Steel" },
                                    { value: "PVC", label: "PVC" }
                                ]}
                                readOnly
                                value={data?.inputData?.pipeMaterial}
                            />
                            <Input
                                type="number"
                                label="Buried Depth"
                                readOnly
                                value={data?.inputData?.buriedDepth}
                                badge="m"
                                step={0.01}
                            />
                            <Input
                                type="number"
                                label="Fan Velocity"
                                readOnly
                                value={data?.inputData?.fanVelocity}
                                badge="m/s"
                                step={0.01}
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
                        <Input
                            type="number"
                            label="Pipe Length"
                            readOnly
                            value={data?.outputData?.pipeLength}
                            className="max-w-[300px]"
                            badge="m"
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
};
