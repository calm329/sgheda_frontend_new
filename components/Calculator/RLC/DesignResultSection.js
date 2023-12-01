import React, { useState } from "react";
import { Input } from "@components/Input";
import { Textarea } from "@components/Textarea";

export const DesignResultSection = ({ footer, data }) => {
    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                    label="Heat Load"
                    readOnly
                    name="ringDiameter"
                    value={data}
                    badge="m"
                />
            </div>
            {footer("")}
        </div>
    );
};
