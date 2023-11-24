import React, { useState } from "react";
import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";

export const PipeDesignSection = () => {
    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-4 gap-4">
                <Input label="Outer Diameter" name="name" badge="m" />
                <Input label="Inner Diameter" name="name" badge="m" />
                <Input label="Pipe Conductivity" name="name" badge="W/(m*K)" />
                <Input label="Buried Depth" name="name" badge="m" />
            </div>
        </div>
    );
};
