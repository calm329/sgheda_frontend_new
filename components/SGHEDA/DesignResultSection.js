import React, { useState } from "react";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";

export const DesignResultSection = () => {
    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-4 gap-4">
                <Input label="Ring Diameter" name="name" badge="m" />
                <Input label="Pitch" name="name" badge="m" />
                <Input label="Number of Ring" name="name" badge="n" />
                <Input label="Pipe Length" name="name" badge="m" />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Input label="Inlet Temperature" name="name" badge="C" />
                <Input label="Diff Temperature" name="name" badge="C" />
                <Input label="System Flow Rate" name="name" badge="m/s" />
            </div>
            <div>
                <Textarea label="Description" name="name" placeholder="" />
            </div>
        </div>
    );
};
