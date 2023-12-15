import React, { useState } from "react";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";

export const DesignResultSection = ({ footer, data }) => {
    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                    label="Pipe Length"
                    readOnly
                    name="pipeLength"
                    value={data?.pipeLength}
                    badge="m"
                />
                <Input
                    label="Inlet Temperature"
                    readOnly
                    name="inletTemperature"
                    value={data?.inletTemperature}
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
            {footer("")}
        </div>
    );
};
