import React, { useState } from "react";
import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";

export const SystemDesignSection = () => {
    return (
        <div className="w-full h-full grid grid-cols-2 gap-8 my-8">
            <div className="flex gap-4">
                <Input type="number" label="Heat Load" name="name" badge="W" />
                <Input type="number" label="Heat Load" name="name" badge="W" />
            </div>
            <div>
                <label htmlFor={"name"} className="mb-1 text-white text-title">
                    Ring Type
                </label>
                <div class="flex w-max gap-4">
                    <RadioButtonGroup
                        options={[
                            { value: "horizontal", label: "Horizontal Slinky" },
                            { value: "vertical", label: "Vertical Slinky" },
                            { value: "earth", label: "Earth Basket" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};
