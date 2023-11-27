import React, { useState } from "react";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";

export const DesignResultSection = ({ footer, data }) => {
    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                    label="Ring Diameter"
                    readOnly
                    name="ringDiameter"
                    value={data?.ringDiameter}
                    badge="m"
                />
                <Input
                    label="Pitch"
                    name="pitch"
                    value={data?.pitch}
                    readOnly
                    badge="m"
                />
                <Input
                    label="Number of Ring"
                    readOnly
                    name="numberOfRing"
                    value={data?.numberOfRing}
                    badge="n"
                />
                <Input
                    label="Pipe Length"
                    readOnly
                    name="pipeLength"
                    value={data?.pipeLength}
                    badge="m"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                    label="Inlet Temperature"
                    readOnly
                    name="inletTemperature"
                    value={data?.inletTemperature}
                    badge="C"
                />
                <Input
                    label="Diff Temperature"
                    readOnly
                    name="diffTemperature"
                    value={data?.diffTemperature}
                    badge="C"
                />
                <Input
                    label="System Flow Rate"
                    readOnly
                    name="systemFlowRate"
                    value={data?.systemFlowRate}
                    badge="m/s"
                />
            </div>
            {/* <div>
                <Textarea
                    label="Description"
                    name="name"
                    value={data?.description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write your description for this design"
                />
            </div> */}
            {footer("")}
        </div>
    );
};
